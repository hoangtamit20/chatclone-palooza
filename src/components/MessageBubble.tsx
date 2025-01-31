interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSent: boolean;
  images?: string[];
}

const MessageBubble = ({ content, timestamp, isSent, images }: MessageBubbleProps) => {
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
              <img
                key={index}
                src={image}
                alt={`Sent image ${index + 1}`}
                className="rounded-lg max-h-48 w-full object-cover"
              />
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