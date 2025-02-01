import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSent: boolean;
  images?: string[];
}

const MessageBubble = ({ content, timestamp, isSent, images }: MessageBubbleProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images!.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images!.length - 1 ? prev + 1 : 0));
  };

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
                <DialogContent className="max-w-screen max-h-screen w-screen h-screen p-0">
                  <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                    <img
                      src={images[currentImageIndex]}
                      alt={`Sent image ${currentImageIndex + 1}`}
                      className="max-w-[90%] max-h-[90%] object-contain"
                    />
                    
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                    
                    <DialogPrimitive.Close className="absolute right-4 top-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors">
                      <X className="h-6 w-6" />
                    </DialogPrimitive.Close>
                  </div>
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