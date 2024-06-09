import { ProblemInput } from './problem';

export enum Role {
  USER = 'user',
  LLM = 'assistant',
}

export type ConversationMessage = { role: Role; content: string; name?: string };

export type ConnectionDetails = {
  problem: ProblemInput;
  conversation: ConversationMessage[];
};
