import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface MessageInputProps {
  isLoading: boolean;
  onModerate: (message: string) => void;
}

const MessageInput = ({ isLoading, onModerate }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onModerate(message);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="message-input"
        className="mb-2 font-semibold text-gray-600"
      >
        Enter a message to check:
      </label>
      <textarea
        id="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="e.g., 'You are awesome!' or something less friendly..."
        className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition text-gray-800 min-h-[100px]"
        rows={4}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !message.trim()}
        className="mt-4 w-full bg-zinc-600 hover:bg-zinc-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Analyzing...
          </>
        ) : (
          "Check Message"
        )}
      </button>
    </div>
  );
};

export default MessageInput;
