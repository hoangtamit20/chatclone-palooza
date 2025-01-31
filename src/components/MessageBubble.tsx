import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSent: boolean;
  images?: string[];
}

const MessageBubble = ({ content, timestamp, isSent, images }: MessageBubbleProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div
      className={`flex ${
        isSent ? "justify-end" : "justify-start"
      } mb-4 animate-message-in`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isSent
            ? "bg-messenger-blue text-white rounded-br-lg"
            : "bg-messenger-gray text-black rounded-bl-lg"
        }`}
      >
        {images && images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            {images.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <img
                    src={image}
                    alt={`Sent image ${index + 1}`}
                    className="rounded-lg max-h-48 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
                  <img
                    src={image}
                    alt={`Sent image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
        {content && <p className="text-sm">{content}</p>}
        <span className="text-xs opacity-70 mt-1 block">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;