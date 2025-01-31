import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-messenger-border p-4 bg-white"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4 py-2 bg-messenger-gray focus:outline-none focus:ring-2 focus:ring-messenger-blue"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-messenger-blue text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
          disabled={!message.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;