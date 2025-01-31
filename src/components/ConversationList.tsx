import { Conversation } from "./ChatLayout";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ConversationList = ({ conversations, selectedId, onSelect }: ConversationListProps) => {
  return (
    <div className="w-80 border-r border-messenger-border flex flex-col">
      <div className="p-4 border-b border-messenger-border">
        <h1 className="text-2xl font-bold">Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-messenger-hover transition-colors ${
              selectedId === conversation.id ? "bg-messenger-hover" : ""
            }`}
            onClick={() => onSelect(conversation.id)}
          >
            <div className="relative">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-12 h-12 rounded-full"
              />
              {conversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold truncate">{conversation.name}</h3>
                <span className="text-xs text-gray-500 ml-2">
                  {conversation.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {conversation.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;