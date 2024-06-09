import type { FC } from "react";
import { Role, type ConversationMessage } from "~/types/Conversation";

const Message: FC<{ message: ConversationMessage }> = ({ message }) => {
  return (
    <div
      className={`max-w-[70%] rounded-sm p-4 ${message.role === Role.USER ? "bg-primary text-secondary self-end" : "bg-secondary text-primary self-start"}`}
    >
      {message.content}
    </div>
  );
};

export default Message;
