import { useState, useRef } from "react";
import { Send, Image, Smile, Plus, X } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFile) {
      onSendMessage(message);
      setMessage("");
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border-t border-messenger-border bg-white">
      {previewUrl && (
        <div className="p-2 border-b border-messenger-border">
          <div className="relative inline-block">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-32 rounded-lg"
            />
            <button
              onClick={clearSelectedFile}
              className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Image size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Smile size={20} />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          
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
            disabled={!message.trim() && !selectedFile}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;