import "server-only";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { blueprintSchema } from "../schemas";
import { BLUEPRINT_SYSTEM_PROMPT, formatBlueprintAnswers } from "../prompts";
import type { AIProvider, BlueprintData } from "../types";

const DEFAULT_MODEL = "gpt-4o-mini";

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY is not configured. Add it to .env.local to enable Blueprint generation.",
      );
    }
    this.client = new OpenAI({ apiKey });
    this.model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  }

  async generateBlueprint(answers: BlueprintData): Promise<BlueprintData> {
    const completion = await this.client.chat.completions.parse({
      model: this.model,
      messages: [
        { role: "system", content: BLUEPRINT_SYSTEM_PROMPT },
        { role: "user", content: formatBlueprintAnswers(answers) },
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
