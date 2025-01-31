import { useState, useRef } from "react";
import { Send, Image, Smile, Plus, X } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || selectedFiles.length > 0) {
      onSendMessage(message);
      setMessage("");
      setSelectedFiles([]);
      setPreviewUrls([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
    }
  };

  const clearSelectedFile = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
    setPreviewUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      URL.revokeObjectURL(newUrls[index]);
      newUrls.splice(index, 1);
      return newUrls;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
    // TODO: Implement emoji picker integration
    console.log("Emoji picker clicked");
  };

  const handleMoreOptions = () => {
    // TODO: Implement more options menu
    console.log("More options clicked");
  };

  return (
    <div className="border-t border-messenger-border bg-white">
      {previewUrls.length > 0 && (
        <div className="p-2 border-b border-messenger-border">
          <div className="flex flex-wrap gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative inline-block">
                <img 
                  src={url} 
                  alt={`Preview ${index + 1}`} 
                  className="max-h-32 rounded-lg"
                />
                <button
                  onClick={() => clearSelectedFile(index)}
                  className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
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
              title="Upload images"
            >
              <Image size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={toggleEmojiPicker}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              title="Choose emoji"
            >
              <Smile size={20} />
            </button>
            <button
              type="button"
              onClick={handleMoreOptions}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              title="More options"
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
            disabled={!message.trim() && selectedFiles.length === 0}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;