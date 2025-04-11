
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Info, Copy } from "lucide-react";
import type { ChatRoom } from "../ChatApp";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ChatWindowProps {
  activeRoom: ChatRoom | undefined;
  onSendMessage: (roomId: string, text: string) => void;
  username: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ activeRoom, onSendMessage, username }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeRoom?.messages]);

  const handleSendMessage = () => {
    if (!activeRoom || !message.trim()) return;
    
    onSendMessage(activeRoom.id, message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyKeyToClipboard = () => {
    if (!activeRoom) return;
    
    navigator.clipboard.writeText(activeRoom.key);
    
    toast({
      title: "Key Copied",
      description: "The room key has been copied to clipboard",
    });
  };

  if (!activeRoom) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0E1621] text-[#8EACBB]">
        <Info size={48} className="mb-4" />
        <h3 className="text-xl font-medium text-white">No Chat Selected</h3>
        <p className="mt-2">Select a chat room or create a new one</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0E1621]">
      {/* Chat header */}
      <div className="p-4 border-b border-[#17212B] bg-[#17212B] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2B5278] flex items-center justify-center text-white">
            {activeRoom.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium text-white">{activeRoom.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8EACBB]">Key: {activeRoom.key}</span>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-5 w-5 text-[#8EACBB] hover:text-white hover:bg-transparent"
                onClick={copyKeyToClipboard}
              >
                <Copy size={14} />
              </Button>
            </div>
          </div>
        </div>
        <div className="text-xs text-[#8EACBB]">
          {activeRoom.messages.length} messages
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeRoom.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#8EACBB] text-center">
            <Info size={40} className="mb-2" />
            <p>No messages yet</p>
            <p className="text-sm mt-1">Send a message to start the conversation</p>
            <div className="mt-4 p-3 bg-[#17212B] rounded-lg border border-[#1E2C3A] max-w-md">
              <p className="text-sm text-left">
                <strong className="text-white">Room Key:</strong> {activeRoom.key}
              </p>
              <p className="text-sm mt-2 text-left">
                Share this key with others so they can join this chat room.
              </p>
            </div>
          </div>
        ) : (
          activeRoom.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-xl px-4 py-2 ${
                  msg.isOwn
                    ? "bg-[#2B5278] text-white rounded-br-none"
                    : "bg-[#182533] text-white rounded-bl-none"
                }`}
              >
                {!msg.isOwn && (
                  <div className="text-xs text-[#8EACBB] mb-1">{msg.senderName}</div>
                )}
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                <div className="text-right">
                  <span className="text-xs opacity-70 mt-1 inline-block">
                    {format(msg.timestamp, "HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t border-[#17212B] bg-[#17212B]">
        <div className="flex gap-2">
          <Input
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-[#242F3D] border-[#1E2C3A] text-white"
          />
          <Button
            size="icon"
            className="bg-[#2B5278] hover:bg-[#3A6D9A] text-white"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
