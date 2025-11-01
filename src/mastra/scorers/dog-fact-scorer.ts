import { createToolCallAccuracyScorerCode } from '@mastra/evals/scorers/code';

export const toolCallAppropriatenessScorer = createToolCallAccuracyScorerCode({
  expectedTool: 'dogFactTool',
  strictMode: false,
});

export const scorers = {
  toolCallAppropriatenessScorer,
};