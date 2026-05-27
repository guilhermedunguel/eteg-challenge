import { tv } from "tailwind-variants";

const selectInputVariants = tv({
  base: "flex flex-wrap gap-2",
});

const optionVariants = tv({
  base: "flex items-center gap-2 px-2 py-1 rounded-full border cursor-pointer transition-colors text-sm",
  variants: {
    selected: {
      true: "border-blue-500 bg-blue-50",
      false: "border-gray-200 bg-white hover:bg-gray-50",
    },
  },
  defaultVariants: {
    selected: false,
  },
});

interface SelectInputOption {
  id: number;
  label: string;
}

interface SelectInputProps<T extends SelectInputOption> {
  label?: string;
  required?: boolean;
  options: T[];
  value?: number;
  onChange: (id: number) => void;
  renderOption?: (option: T, selected: boolean) => React.ReactNode;
  error?: string;
}

export function SelectInput<T extends SelectInputOption>({
  label,
  required,
  options,
  value,
  onChange,
  renderOption,
  error,
}: SelectInputProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="flex flex-row gap-0.5 text-sm text-gray-600">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className={selectInputVariants()}>
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              className={optionVariants({ selected: isSelected })}
              onClick={() => onChange(option.id)}
            >
              {renderOption ? renderOption(option, isSelected) : option.label}
            </button>
          );
        })}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
