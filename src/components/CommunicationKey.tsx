
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateCommunicationKey, isValidCommunicationKey } from "@/utils/chatBotUtils";
import { cn } from "@/lib/utils";
import { KeyRound, Copy, CheckCircle } from "lucide-react";

interface CommunicationKeyProps {
  onConnect: (key: string) => void;
}

const CommunicationKey: React.FC<CommunicationKeyProps> = ({ onConnect }) => {
  const [generatedKey, setGeneratedKey] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [keyError, setKeyError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = () => {
    const newKey = generateCommunicationKey();
    setGeneratedKey(newKey);
    setCopied(false);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectWithKey = () => {
    if (isValidCommunicationKey(inputKey)) {
      onConnect(inputKey);
      setKeyError("");
    } else {
      setKeyError("Please enter a valid 8-character key");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-indigo-800 flex items-center">
        <KeyRound className="mr-2 h-5 w-5" />
        Communication Key
      </h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Generate a unique key to share with others:</p>
          <div className="flex gap-2">
            <Button 
              onClick={handleGenerateKey}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Generate Key
            </Button>
            
            {generatedKey && (
              <div className="flex-1 flex items-center">
                <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 font-mono text-base flex-1">
                  {generatedKey}
                </div>
                <Button
                  onClick={handleCopyKey}
                  variant="outline"
                  className="rounded-l-none border border-gray-300"
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 mb-2">Connect using someone else's key:</p>
          <div className="flex gap-2">
            <Input
              type="text"
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value.toUpperCase());
                setKeyError("");
              }}
              placeholder="Enter key"
              className={cn(keyError && "border-red-400")}
              maxLength={8}
            />
            <Button 
              onClick={handleConnectWithKey}
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={inputKey.length !== 8}
            >
              Connect
            </Button>
          </div>
          {keyError && <p className="text-sm text-red-500 mt-1">{keyError}</p>}
        </div>
      </div>
    </div>
  );
};

export default CommunicationKey;
