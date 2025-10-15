interface ErrorDisplayProps {
  message: string | null;
}

const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  if (!message) return null;

  return (
    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
