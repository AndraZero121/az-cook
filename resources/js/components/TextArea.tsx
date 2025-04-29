interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function TextArea({ label, error, className = '', ...props }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label className="block font-semibold mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={`w-full rounded-lg border p-2 outline-none transition-colors ${
          error 
            ? 'border-red-500 focus:border-red-600' 
            : 'border-gray-200 focus:border-blue-500'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}