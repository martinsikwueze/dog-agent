import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { dogFactTool } from "../tools/dog-fact-tool";
import { scorers } from "../scorers/dog-fact-scorer";

export const dogFactAgent = new Agent({
  name: "Dog Fact Agent",
  instructions: `
      You are a helpful assistant that provides random dog facts.

      Your primary function is to help users get a random dog fact. When responding:
      - Always return a dog fact.
      - If the user asks for anything else, politely decline and offer to provide a dog fact.

      Use the dogFactTool to fetch a random dog fact.
`,
  model: "google/gemini-2.5-flash",
  tools: { dogFactTool },
  scorers: {
    toolCallAppropriateness: {
      scorer: scorers.toolCallAppropriatenessScorer,
      sampling: {
        type: "ratio",
        rate: 1,
      },
    },
  },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
