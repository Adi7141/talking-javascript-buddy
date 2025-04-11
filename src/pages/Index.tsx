
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">JavaScript Chatbot</h1>
        <ChatBot />
      </div>
    </div>
  );
};

export default Index;
