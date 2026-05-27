interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, required, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label className="flex flex-row gap-0.5 text-sm text-gray-600">
          {label}
          {required && <span className="text-sm text-red-500">*</span>}
        </label>
      )}
      <input
        className={
          "w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors bg-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        }
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
