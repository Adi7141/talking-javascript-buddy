
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: (username: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [username, setUsername] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onComplete(username.trim());
    }
  };
  
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#17212B] p-6">
      <div className="w-full max-w-md bg-[#0E1621] p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#2B5278] flex items-center justify-center mb-4">
            <MessageSquare size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Telegram-like Chat</h1>
          <p className="text-[#8EACBB] text-center">
            Create or join chatrooms with unique communication keys
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[#8EACBB]">Choose a Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-[#242F3D] border-[#1E2C3A] text-white"
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-[#2B5278] hover:bg-[#3A6D9A] text-white"
            disabled={!username.trim()}
          >
            Start Chatting
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-[#8EACBB]">
          <p>Your chats will be stored locally in your browser.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
