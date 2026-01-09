const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
      <p className="text-red-600 dark:text-red-400 text-sm">{message}</p>
    </div>
  );
};
