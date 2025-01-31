import { useState } from "react";
import ConversationList from "./ConversationList";
import ChatArea from "./ChatArea";

export type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  online: boolean;
  avatar: string;
};

const ChatLayout = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const conversations: Conversation[] = [
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      timestamp: "2:30 PM",
      online: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "2",
      name: "Jane Smith",
      lastMessage: "See you tomorrow!",
      timestamp: "1:45 PM",
      online: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
  ];

  return (
    <div className="flex h-screen bg-white">
      <ConversationList
        conversations={conversations}
        selectedId={selectedConversation}
        onSelect={setSelectedConversation}
      />
      <ChatArea conversation={conversations.find(c => c.id === selectedConversation)} />
    </div>
  );
};

export default ChatLayout;