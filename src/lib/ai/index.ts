import "server-only";
import type { AIProvider } from "./types";
import { OpenAIProvider } from "./providers/openai";

let cachedProvider: AIProvider | null = null;

/**
 * Returns the configured AI provider. Selected via the AI_PROVIDER env var
 * (defaults to "openai") so the backend can switch vendors — Claude, Azure
 * OpenAI, etc. — through configuration alone. Application code (Server
 * Actions, components) should only ever import from this module, never a
 * concrete provider class directly.
 *
 * To add a provider: implement `AIProvider` in `lib/ai/providers/<name>.ts`
 * and add a case below. No caller changes required.
 */
export function getAIProvider(): AIProvider {
  if (cachedProvider) return cachedProvider;

  const providerName = (process.env.AI_PROVIDER || "openai").toLowerCase();

  switch (providerName) {
    case "openai":
      cachedProvider = new OpenAIProvider();
      break;
    default:
      throw new Error(`Unknown AI_PROVIDER "${providerName}". Supported providers: openai.`);
  }

  return cachedProvider;
}

export type { AIProvider, ChatMessage, ConversationTurnResult, BlueprintData } from "./types";
