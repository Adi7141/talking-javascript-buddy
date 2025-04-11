
import React from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(message.timestamp);

  return (
    <div
      className={cn(
        "flex mb-4",
        message.isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-4 py-2 animate-fadeIn",
          message.isBot
            ? "bg-gray-200 rounded-tl-none"
            : "bg-indigo-600 text-white rounded-tr-none"
        )}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 block text-right mt-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
