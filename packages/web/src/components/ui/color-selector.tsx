import { use } from "react";
import { SelectInput } from "../primitives/select-input";
import { env } from "../../../env";

interface Color {
  id: number;
  name: string;
  hex: string;
}

interface ColorSelectorProps {
  value?: number;
  onChange: (id: number) => void;
  error?: string;
}

const colorsPromise: Promise<Color[]> = fetch(
  `${env.VITE_SERVER_URL}/v1/colors`,
).then((response) => response.json());

export function ColorSelector({ value, onChange, error }: ColorSelectorProps) {
  const colors = use(colorsPromise);

  return (
    <SelectInput
      label="Cor preferida"
      required
      options={colors.map((color) => ({
        id: color.id,
        label: color.name,
        hex: color.hex,
      }))}
      value={value}
      onChange={onChange}
      error={error}
      renderOption={(option) => (
        <>
          <span
            className="w-4 h-4 rounded-full inline-block"
            style={{ backgroundColor: option.hex }}
          />
          {option.label}
        </>
      )}
    />
  );
}
