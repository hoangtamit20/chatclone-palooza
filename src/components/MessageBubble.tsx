interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSent: boolean;
}

const MessageBubble = ({ content, timestamp, isSent }: MessageBubbleProps) => {
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
        <p className="text-sm">{content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;