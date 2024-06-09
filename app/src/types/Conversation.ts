export enum Role {
  USER = "user",
  LLM = "assistant",
}

export type ConversationMessage = {
  role: Role;
  content: string;
};
