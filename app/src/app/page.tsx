"use client";
import { useEffect, useState } from "react";
import { type Socket, io } from "socket.io-client";
import ChatWindow from "~/components/ChatWindow";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { env } from "~/env";
import { Role, type ConversationMessage } from "~/types/Conversation";

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [problemLink, setProblemLink] = useState("");
  const [shouldConnect, setShouldConnect] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | undefined>();

  const [conversation, setConversation] = useState<ConversationMessage[]>([]);

  const handleSend = (message: string) => {
    setIsChatLoading(true);
    socket?.emit("message", message);
    setConversation((c) => {
      const newConv = [...c];
      newConv.push({ content: message, role: Role.USER });
      return newConv;
    });
  };

  useEffect(() => {
    if (shouldConnect) {
      const connection = io(env.NEXT_PUBLIC_SERVER_BASE_URL, {
        query: {
          problem: problemLink,
        },
      });
      setSocket(connection);
      connection.on("connect", () => {
        setIsConnected(true);
        setIsLoading(false);
      });
      connection.on("disconnect", () => {
        alert("Invalid problem");
        setIsConnected(false);
        setConversation([]);
      });
      connection.on("message", (message: string) => {
        setConversation((c) => {
          const newC = [...c];
          newC.push({ role: Role.LLM, content: message });
          return newC;
        });
        setIsChatLoading(false);
      });
    }
    if (socket)
      return () => {
        socket.close();
      };
  }, [shouldConnect]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-[80vw] flex-col gap-4 rounded-sm border-2 p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter problem link"
            onChange={(e) => {
              setProblemLink(e.target.value);
            }}
            value={problemLink}
            id="problemLink"
            type="problem"
            disabled={isConnected || isLoading}
          />
          <Button
            disabled={isConnected || isLoading}
            variant={isConnected ? "ghost" : "default"}
            onClick={() => {
              const urlPattern =
                /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|\d{1,3}(\.\d{1,3}){3}|localhost)(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
              if (urlPattern.test(problemLink)) setShouldConnect(true);
            }}
          >
            {isConnected ? "Connected 🟢" : "Connect"}
          </Button>
        </div>
        {isConnected && (
          <ChatWindow
            conversation={conversation}
            isLoading={isChatLoading}
            sendMessage={handleSend}
          />
        )}
      </div>
    </main>
  );
}
