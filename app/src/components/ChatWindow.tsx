"use client";
import { useState, type FC, useEffect, useRef } from "react";
import type { ConversationMessage } from "~/types/Conversation";
import Message from "./Message";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Textarea } from "./ui/textarea";

const ChatWindow: FC<{
  conversation: ConversationMessage[];
  sendMessage: (message: string) => void;
  isLoading: boolean;
}> = ({ conversation, sendMessage, isLoading }) => {
  const [input, setInput] = useState<string>("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isLoading) {
      if (inputRef.current) inputRef.current?.focus();
    }
  }, [isLoading]);

  return (
    <div className="relative flex w-full flex-col items-center gap-4 rounded-sm border">
      <div className="bg-primary absolute left-0 top-0 z-10 w-full rounded-sm p-4 text-center text-white">
        Ask Questions
      </div>
      <ScrollArea className="h-[70vh] w-full">
        <div className="flex flex-col gap-4 p-4 py-32 pt-20">
          {conversation.map((c, idx) => (
            <Message message={c} key={idx} />
          ))}
        </div>
      </ScrollArea>
      <form
        className="bg-secondary absolute bottom-0 flex w-full items-center justify-center gap-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage(input.trim());
            setInput("");
          }
        }}
        id="query-form"
        ref={formRef}
      >
        <Textarea
          placeholder="Ask a question"
          className="border-primary resize-none rounded-sm"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          disabled={isLoading}
          ref={inputRef}
        />
        <Button
          className="h-[100%] rounded-sm"
          type="submit"
          disabled={isLoading}
        >
          <ArrowRight />
        </Button>
      </form>
    </div>
  );
};

export default ChatWindow;
