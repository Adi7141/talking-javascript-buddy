
import React, { useState, useEffect } from "react";
import Sidebar from "./chat/Sidebar";
import ChatWindow from "./chat/ChatWindow";
import WelcomeScreen from "./chat/WelcomeScreen";
import { generateCommunicationKey, isValidCommunicationKey } from "@/utils/chatBotUtils";
import { useToast } from "@/hooks/use-toast";

export interface ChatRoom {
  id: string;
  name: string;
  key: string;
  messages: Message[];
  lastMessage?: {
    text: string;
    time: Date;
  };
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isOwn: boolean;
}

const ChatApp = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { toast } = useToast();

  // Load chat rooms from local storage
  useEffect(() => {
    const savedUsername = localStorage.getItem("telegram-clone-username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
    
    const savedRooms = localStorage.getItem("telegram-clone-rooms");
    if (savedRooms) {
      try {
        const parsedRooms = JSON.parse(savedRooms);
        // Convert string dates back to Date objects
        const roomsWithDates = parsedRooms.map((room: any) => ({
          ...room,
          messages: room.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })),
          lastMessage: room.lastMessage 
            ? { ...room.lastMessage, time: new Date(room.lastMessage.time) }
            : undefined
        }));
        setChatRooms(roomsWithDates);
      } catch (e) {
        console.error("Error parsing saved rooms:", e);
        setChatRooms([]);
      }
    }
  }, []);

  // Save chat rooms to local storage whenever they change
  useEffect(() => {
    if (chatRooms.length > 0) {
      localStorage.setItem("telegram-clone-rooms", JSON.stringify(chatRooms));
    }
  }, [chatRooms]);

  // Save username to local storage whenever it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("telegram-clone-username", username);
    }
  }, [username]);

  const handleSetupComplete = (name: string) => {
    setUsername(name);
    setIsSetupComplete(true);
  };

  const createChatRoom = (name: string) => {
    const newKey = generateCommunicationKey();
    const newRoom: ChatRoom = {
      id: `room-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      key: newKey,
      messages: [],
    };
    
    setChatRooms(prev => [...prev, newRoom]);
    setActiveRoomId(newRoom.id);
    
    toast({
      title: "Chatroom Created",
      description: `Room "${name}" created with key: ${newKey}`
    });
    
    return newRoom;
  };

  const joinChatRoom = (key: string, name: string) => {
    // Check if room already exists
    const existingRoom = chatRooms.find(room => room.key === key);
    
    if (existingRoom) {
      setActiveRoomId(existingRoom.id);
      toast({
        title: "Room Joined",
        description: `You've joined "${existingRoom.name}"`
      });
      return existingRoom;
    }
    
    // Create new room with the provided key
    if (isValidCommunicationKey(key)) {
      const newRoom: ChatRoom = {
        id: `room-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name,
        key,
        messages: [],
      };
      
      setChatRooms(prev => [...prev, newRoom]);
      setActiveRoomId(newRoom.id);
      
      toast({
        title: "Chatroom Joined",
        description: `You've joined "${name}" with key: ${key}`
      });
      
      return newRoom;
    } else {
      toast({
        title: "Invalid Key",
        description: "The communication key is invalid",
        variant: "destructive"
      });
      return null;
    }
  };

  const sendMessage = (roomId: string, text: string) => {
    if (!text.trim()) return;
    
    setChatRooms(prev => {
      return prev.map(room => {
        if (room.id === roomId) {
          const newMessage: Message = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            text,
            senderId: username,
            senderName: username,
            timestamp: new Date(),
            isOwn: true
          };
          
          // Simulate a response after 1-2 seconds
          setTimeout(() => {
            if (room.messages.length < 2) { // Only for the first few messages
              simulateResponse(roomId);
            }
          }, 1000 + Math.random() * 1000);
          
          return {
            ...room,
            messages: [...room.messages, newMessage],
            lastMessage: {
              text,
              time: new Date()
            }
          };
        }
        return room;
      });
    });
  };

  const simulateResponse = (roomId: string) => {
    const responses = [
      "Hello! Nice to meet you.",
      "Welcome to the chat room!",
      "How can I help you today?",
      "I'm glad you're here.",
      "Let's start chatting!"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setChatRooms(prev => {
      return prev.map(room => {
        if (room.id === roomId) {
          const botMessage: Message = {
            id: `bot-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            text: randomResponse,
            senderId: "bot",
            senderName: "Bot",
            timestamp: new Date(),
            isOwn: false
          };
          
          return {
            ...room,
            messages: [...room.messages, botMessage],
            lastMessage: {
              text: randomResponse,
              time: new Date()
            }
          };
        }
        return room;
      });
    });
  };

  const activeRoom = chatRooms.find(room => room.id === activeRoomId);

  if (!isSetupComplete) {
    return <WelcomeScreen onComplete={handleSetupComplete} />;
  }

  return (
    <div className="flex h-full bg-[#0E1621]">
      <Sidebar 
        chatRooms={chatRooms}
        activeRoomId={activeRoomId}
        onRoomSelect={setActiveRoomId}
        onCreateRoom={createChatRoom}
        onJoinRoom={joinChatRoom}
        username={username}
      />
      
      <ChatWindow 
        activeRoom={activeRoom}
        onSendMessage={sendMessage}
        username={username}
      />
    </div>
  );
};

export default ChatApp;
