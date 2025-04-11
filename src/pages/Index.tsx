
import { useState } from "react";
import ChatApp from "@/components/ChatApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0E1621] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[85vh] rounded-xl overflow-hidden shadow-2xl">
        <ChatApp />
      </div>
    </div>
  );
};

export default Index;
