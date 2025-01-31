import { useState } from "react";
import { Conversation } from "./ChatLayout";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

interface ChatAreaProps {
  conversation: Conversation | undefined;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
}

const ChatArea = ({ conversation }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there!",
      timestamp: "2:30 PM",
      isSent: false,
    },
    {
      id: "2",
      content: "Hi! How are you?",
      timestamp: "2:31 PM",
      isSent: true,
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: "numeric",
        minute: "2-digit",
      }),
      isSent: true,
    };
    setMessages([...messages, newMessage]);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-messenger-border flex items-center gap-3">
        <img
          src={conversation.avatar}
          alt={conversation.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold">{conversation.name}</h2>
          <span className="text-sm text-gray-500">
            {conversation.online ? "Active now" : "Offline"}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isSent={message.isSent}
          />
        ))}
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;