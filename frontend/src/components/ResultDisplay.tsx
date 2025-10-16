import type { ModerationResult } from "../types";

interface ResultDisplayProps {
  result: ModerationResult | null;
}

export const ResultDisplay = ({ result }: ResultDisplayProps) => {
  if (!result) return null;

  const getActionChipClass = (action: string) => {
    switch (action.toUpperCase()) {
      case "ALLOW":
        return "bg-green-100 text-green-800";
      case "REVIEW":
        return "bg-yellow-100 text-yellow-800";
      case "BLOCK":
      case "REPLACE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderProgressBar = (category: string, value: number) => (
    <div key={category}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 capitalize">
          {category}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {(value * 100).toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${value * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="mt-6 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Analysis Result</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-gray-50 text-center">
          <div className="text-sm font-semibold text-gray-600 mb-1">
            Suggested Action
          </div>
          <div
            className={`inline-block px-4 py-1 text-base font-bold rounded-full ${getActionChipClass(
              result.action_reason
            )}`}
          >
            {result.action_reason.toUpperCase()}
          </div>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 text-center">
          <div className="text-sm font-semibold text-gray-600 mb-1">
            Toxicity Score
          </div>
          <div className="text-2xl font-bold text-red-600">
            {(result.toxicity_score * 100).toFixed(1)}%
          </div>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 text-center">
          <div className="text-sm font-semibold text-gray-600 mb-1">
            Confidence
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {(result.confidence * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {result.reason && (
          <div>
            <span className="font-semibold text-gray-600">Reason:</span>
            <p className="text-gray-800 italic bg-gray-100 p-2 rounded mt-1">
              {result.reason}
            </p>
          </div>
        )}
        {result.normalized_text && (
          <div>
            <span className="font-semibold text-gray-600">
              Normalized Text:
            </span>
            <p className="text-gray-800 font-mono bg-gray-100 p-2 rounded mt-1">
              {result.normalized_text}
            </p>
          </div>
        )}
        {result.suggested_replacement && (
          <div>
            <span className="font-semibold text-gray-600">
              Suggested Replacement:
            </span>
            <p className="text-green-700 font-mono bg-green-50 p-2 rounded mt-1">
              {result.suggested_replacement}
            </p>
          </div>
        )}
        {result.bad_words.length > 0 && (
          <div>
            <span className="font-semibold text-gray-600">Flagged Words:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {result.bad_words.map((word, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md font-mono"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Category Scores
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(result.categories).map(([category, value]) =>
            renderProgressBar(category, value)
          )}
        </div>
      </div>
    </div>
  );
};
