import getEnvVar from 'env/index';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

import { ProblemInput } from 'types/problem';

const openai = new OpenAI({ apiKey: getEnvVar('OPENAI_API_KEY') });

export const prompt = async (problem: ProblemInput, context: ChatCompletionMessageParam[]) => {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: 'You are a DSA tutor, your job is to help the user to build intuition for the given dsa problem',
    },
    { role: 'system', content: 'Never give the solution for even a brute force apporach even if the user asks for it' },
    {
      role: 'system',
      content: `Here's the problem title: ${problem.title}\n The problem content: ${problem.content} Topics: ${problem.topics} Hints: ${problem.hints}`,
    },
    { role: 'system', content: 'you will help the user come to the solution by asking user the relevant questions and making them think' },
    {
      role: 'assistant',
      content:
        'I will not give the user the direct solution rather try for the user to build an intution and make the user solve the problem theirself',
    },
    {
      role: 'assistant',
      content:
        'I will not reveal the topics of the problem to the user but rather give very little hints about the data structure and approach if the user is not able to get to it themselves',
    },
  ];

  messages.push(...context);
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });
};
