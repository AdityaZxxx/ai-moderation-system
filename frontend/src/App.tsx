import { useState } from "react";
import axios from "axios";

// Type definition for the expected API response
interface ModerationResult {
  is_offensive: boolean;
  toxicity_level: "None" | "Low" | "Medium" | "High" | "Severe";
  offending_words: string[];
  reason: string;
  suggested_action: "ALLOW" | "REVIEW" | "BLOCK";
}

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ModerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModerate = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/moderate", {
        message,
      });
      setResult(response.data);
    } catch (err) {
      let errorMessage = "An unknown error occurred.";
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = `Error from server: ${err.response.data}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionChipClass = (action: string) => {
    switch (action) {
      case "ALLOW":
        return "bg-green-100 text-green-800";
      case "REVIEW":
        return "bg-yellow-100 text-yellow-800";
      case "BLOCK":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100">AI Content Moderation</h1>
          <p className="text-gray-400 mt-2">
            A demo using Gemini to check messages for offensive content before they go public.
          </p>
        </header>

        <main className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col">
            <label htmlFor="message-input" className="mb-2 font-semibold text-gray-300">
              Enter a message to check:
            </label>
            <textarea
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., 'You are awesome!' or something less friendly..."
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-200 min-h-[100px]"
              rows={4}
            />
            <button
              onClick={handleModerate}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Check Message"
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-200">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 p-4 bg-gray-700/50 border border-gray-600 rounded-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-200">Analysis Result</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-400">Suggested Action:</span>
                  <span className={`px-3 py-1 text-sm font-bold rounded-full ${getActionChipClass(result.suggested_action)}`}>
                    {result.suggested_action}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-400">Is Offensive:</span>
                  <span className={`font-bold ${result.is_offensive ? 'text-red-400' : 'text-green-400'}`}>
                    {result.is_offensive ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-400">Toxicity Level:</span>
                  <span className="font-medium text-gray-300">{result.toxicity_level}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-400 mb-1">Reason:</span>
                  <p className="text-gray-300 italic">{result.reason}</p>
                </div>
                {result.offending_words.length > 0 && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-400 mb-1">Offending Words:</span>
                    <div className="flex flex-wrap gap-2">
                      {result.offending_words.map((word, index) => (
                        <span key={index} className="px-2 py-1 bg-red-900/70 text-red-200 text-xs rounded">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with React, ElysiaJS, and the Gemini API.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;