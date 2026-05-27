interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, required, error, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label className="flex flex-row gap-0.5 text-sm text-gray-600">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors bg-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed resize-none"
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
