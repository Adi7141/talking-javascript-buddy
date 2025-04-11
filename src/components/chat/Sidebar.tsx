
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { ChatRoom } from "../ChatApp";
import { MessageSquare, Plus, User, Key } from "lucide-react";
import { format } from "date-fns";

interface SidebarProps {
  chatRooms: ChatRoom[];
  activeRoomId: string | null;
  onRoomSelect: (id: string) => void;
  onCreateRoom: (name: string) => ChatRoom;
  onJoinRoom: (key: string, name: string) => ChatRoom | null;
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  chatRooms,
  activeRoomId,
  onRoomSelect,
  onCreateRoom,
  onJoinRoom,
  username
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");
  const [joinRoomKey, setJoinRoomKey] = useState("");

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      onCreateRoom(newRoomName);
      setNewRoomName("");
      setIsCreateDialogOpen(false);
    }
  };

  const handleJoinRoom = () => {
    if (joinRoomName.trim() && joinRoomKey.trim()) {
      onJoinRoom(joinRoomKey.trim(), joinRoomName.trim());
      setJoinRoomName("");
      setJoinRoomKey("");
      setIsJoinDialogOpen(false);
    }
  };

  return (
    <div className="w-80 border-r border-[#17212B] bg-[#17212B] flex flex-col">
      <div className="p-4 border-b border-[#1E2C3A] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User size={20} className="text-[#8EACBB]" />
          <span className="text-white font-medium">{username}</span>
        </div>
        <div className="flex gap-2">
          <Button 
            size="icon" 
            variant="ghost"
            className="bg-[#2B5278] hover:bg-[#3A6D9A] text-white"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chatRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <MessageSquare size={40} className="text-[#8EACBB] mb-2" />
            <p className="text-[#8EACBB]">No chats yet</p>
            <p className="text-sm text-[#8EACBB] mt-1">Create or join a chat room to start messaging</p>
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                className="bg-[#2B5278] hover:bg-[#3A6D9A] text-white border-0"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                Create Room
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#2B5278] hover:bg-[#3A6D9A] text-white border-0"
                onClick={() => setIsJoinDialogOpen(true)}
              >
                Join Room
              </Button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[#1E2C3A]">
            {chatRooms.map((room) => (
              <div
                key={room.id}
                className={`p-4 cursor-pointer hover:bg-[#1E2C3A] transition-colors ${
                  activeRoomId === room.id ? "bg-[#2B5278]" : ""
                }`}
                onClick={() => onRoomSelect(room.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#2B5278] flex items-center justify-center text-white">
                    {room.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-white truncate">{room.name}</span>
                      {room.lastMessage && (
                        <span className="text-xs text-[#8EACBB]">
                          {format(room.lastMessage.time, "HH:mm")}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#8EACBB] truncate max-w-[180px]">
                        {room.lastMessage 
                          ? room.lastMessage.text 
                          : `Room Key: ${room.key}`}
                      </span>
                      {room.messages.length > 0 && (
                        <span className="h-5 w-5 bg-[#4FAE4E] rounded-full flex items-center justify-center text-xs text-white">
                          {room.messages.length}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-[#1E2C3A]">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 bg-[#2B5278] hover:bg-[#3A6D9A] text-white border-0"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            Create Room
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 bg-[#2B5278] hover:bg-[#3A6D9A] text-white border-0"
            onClick={() => setIsJoinDialogOpen(true)}
          >
            Join Room
          </Button>
        </div>
      </div>
      
      {/* Create Room Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#17212B] text-white border-[#1E2C3A]">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Chat Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              placeholder="Enter room name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="bg-[#242F3D] border-[#1E2C3A] text-white"
            />
            <Button 
              onClick={handleCreateRoom}
              className="w-full bg-[#2B5278] hover:bg-[#3A6D9A] text-white"
            >
              Create Room
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Join Room Dialog */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="bg-[#17212B] text-white border-[#1E2C3A]">
          <DialogHeader>
            <DialogTitle className="text-white">Join Chat Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm text-[#8EACBB]">Room Name</label>
              <Input
                placeholder="Enter room name"
                value={joinRoomName}
                onChange={(e) => setJoinRoomName(e.target.value)}
                className="bg-[#242F3D] border-[#1E2C3A] text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm flex items-center gap-2 text-[#8EACBB]">
                <Key size={14} />
                Communication Key
              </label>
              <Input
                placeholder="Enter the 8-character key"
                value={joinRoomKey}
                onChange={(e) => setJoinRoomKey(e.target.value.toUpperCase())}
                className="bg-[#242F3D] border-[#1E2C3A] text-white font-mono"
                maxLength={8}
              />
            </div>
            <Button 
              onClick={handleJoinRoom}
              className="w-full bg-[#2B5278] hover:bg-[#3A6D9A] text-white"
              disabled={!joinRoomName.trim() || joinRoomKey.length !== 8}
            >
              Join Room
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
