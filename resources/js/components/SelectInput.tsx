interface Option {
  value: string | number;
  label: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
}

export default function SelectInput({ label, error, options, className = '', ...props }: Props) {
  return (
    <div className="w-full">
      {label && (
        <label className="block font-semibold mb-1.5">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-lg border p-2 outline-none transition-colors ${
          error 
            ? 'border-red-500 focus:border-red-600' 
            : 'border-gray-200 focus:border-blue-500'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}