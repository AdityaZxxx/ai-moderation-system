import type { ModerationResult } from "../types";
interface ResultDisplayProps {
  result: ModerationResult | null;
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  if (!result) return null;

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
    <div className="mt-6 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Analysis Result</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Suggested Action:</span>
          <span
            className={`px-3 py-1 text-sm font-bold rounded-full ${getActionChipClass(
              result.suggested_action
            )}`}
          >
            {result.suggested_action}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Is Offensive:</span>
          <span
            className={`font-bold ${
              result.is_offensive ? "text-red-600" : "text-green-600"
            }`}
          >
            {result.is_offensive ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-600">Toxicity Level:</span>
          <span className="font-medium text-gray-800">
            {result.toxicity_level}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-600 mb-1">Reason:</span>
          <p className="text-gray-700 italic bg-gray-50 p-2 rounded-md">
            {result.reason}
          </p>
        </div>
        {result.offending_words.length > 0 && (
          <div className="flex flex-col">
            <span className="font-semibold text-gray-600 mb-1">
              Offending Words:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.offending_words.map((word, index) => (
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
    </div>
  );
};

export default ResultDisplay;
