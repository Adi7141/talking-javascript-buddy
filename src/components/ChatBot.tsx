
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import CommunicationKey from "./CommunicationKey";
import { getResponseForMessage } from "@/utils/chatBotUtils";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your friendly chatbot. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionKey, setConnectionKey] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Show bot typing indicator
    setIsTyping(true);
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponse = getResponseForMessage(input);
      
      // Add bot response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleConnect = (key: string) => {
    setConnectionKey(key);
    
    // Add connection message
    const connectionMessage: Message = {
      id: `system-${Date.now()}`,
      text: `Connected with key: ${key}. You can now chat with the connected user.`,
      isBot: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, connectionMessage]);
  };

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-indigo-600 p-4 text-white">
        <h2 className="text-xl font-bold">Friendly ChatBot</h2>
        <p className="text-xs opacity-75">
          {connectionKey 
            ? `Connected with key: ${connectionKey}` 
            : "Always here to chat"
          }
        </p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center my-2 ml-2">
            <div className="bg-gray-200 p-3 rounded-xl max-w-[80%] animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <CommunicationKey onConnect={handleConnect} />
        
        <div className="flex gap-2 mt-4">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={input.trim() === ""} 
            className={cn(
              "bg-indigo-600 hover:bg-indigo-700",
              input.trim() === "" && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
