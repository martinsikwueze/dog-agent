import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

interface DogFactResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      body: string;
    };
  }[];
}

export const dogFactTool = createTool({
  id: 'get-dog-fact',
  description: 'Get a random dog fact',
  inputSchema: z.object({}),
  outputSchema: z.object({
    fact: z.string(),
  }),
  execute: async () => {
    return await getDogFact();
  },
});

const getDogFact = async () => {
  const dogFactUrl = 'https://dogapi.dog/api/v2/facts?limit=1';
  const dogFactResponse = await fetch(dogFactUrl);
  const dogFactData = (await dogFactResponse.json()) as DogFactResponse;

  if (!dogFactData.data?.[0]) {
    throw new Error('No dog fact found');
  }

  const { body } = dogFactData.data[0].attributes;

  return {
    fact: body,
  };
};