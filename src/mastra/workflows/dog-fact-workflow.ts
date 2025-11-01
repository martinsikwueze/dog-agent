import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

const dogFactSchema = z.object({
  fact: z.string(),
});

const fetchDogFact = createStep({
  id: 'fetch-dog-fact',
  description: 'Fetches a random dog fact',
  inputSchema: z.object({}),
  outputSchema: dogFactSchema,
  execute: async ({ mastra }) => {
    const agent = mastra?.getAgent('dogFactAgent');
    if (!agent) {
      throw new Error('Dog fact agent not found');
    }

    const response = await agent.stream([
      {
        role: 'user',
        content: 'Get a random dog fact',
      },
    ]);

    let factText = '';

    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      factText += chunk;
    }

    return {
      fact: factText,
    };
  },
});

const dogFactWorkflow = createWorkflow({
  id: 'dog-fact-workflow',
  inputSchema: z.object({}),
  outputSchema: z.object({
    fact: z.string(),
  }),
})
  .then(fetchDogFact);

dogFactWorkflow.commit();

export { dogFactWorkflow };