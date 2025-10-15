import axios from "axios";
import { useState } from "react";

import type { ModerationResult } from "./types";

import ErrorDisplay from "./components/ErrorDisplay";
import Header from "./components/Header";
import MessageInput from "./components/MessageInput";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [result, setResult] = useState<ModerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModerate = async (message: string) => {
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
        errorMessage = `Error from server: ${err.response.data}`
          .replace(/Error:/g, "")
          .trim();
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <Header />

        <main className="bg-white rounded-lg shadow-md p-6">
          <MessageInput onModerate={handleModerate} isLoading={isLoading} />
        </main>

        <div className="mt-6">
          <ErrorDisplay message={error} />
          <ResultDisplay result={result} />
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with React, ElysiaJS, and the Gemini API.</p>
          <p>
            By{" "}
            <a
              href="https://github.com/AdityaZxxx"
              target="_blank"
              rel="noreferrer"
            >
              Aditya
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
