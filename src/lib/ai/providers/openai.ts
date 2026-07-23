import "server-only";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { conversationTurnSchema, blueprintSchema } from "../schemas";
import { CONVERSATION_SYSTEM_PROMPT, BLUEPRINT_SYSTEM_PROMPT } from "../prompts";
import type { AIProvider, ChatMessage, ConversationTurnResult, BlueprintData } from "../types";

const DEFAULT_MODEL = "gpt-4o-mini";

function toOpenAIMessages(history: ChatMessage[]) {
  return history.map((message) => ({ role: message.role, content: message.content }));
}

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY is not configured. Add it to .env.local to enable the AI Planner.",
      );
    }
    this.client = new OpenAI({ apiKey });
    this.model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  }

  async continueConversation(history: ChatMessage[]): Promise<ConversationTurnResult> {
    const completion = await this.client.chat.completions.parse({
      model: this.model,
      messages: [
        { role: "system", content: CONVERSATION_SYSTEM_PROMPT },
        ...toOpenAIMessages(history),
      ],
      response_format: zodResponseFormat(conversationTurnSchema, "conversation_turn"),
    });

    const parsed = completion.choices[0]?.message.parsed;
    if (!parsed) {
      throw new Error("OpenAI did not return a parsed conversation turn.");
    }
    return parsed;
  }

  async generateBlueprint(history: ChatMessage[]): Promise<BlueprintData> {
    const completion = await this.client.chat.completions.parse({
      model: this.model,
      messages: [
        { role: "system", content: BLUEPRINT_SYSTEM_PROMPT },
        ...toOpenAIMessages(history),
      ],
      response_format: zodResponseFormat(blueprintSchema, "infrastructure_blueprint"),
    });

    const parsed = completion.choices[0]?.message.parsed;
    if (!parsed) {
      throw new Error("OpenAI did not return a parsed blueprint.");
    }
    return parsed;
  }
}
