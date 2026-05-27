import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "w-full px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-600",
      secondary:
        "bg-neutral-100 text-gray-700 hover:bg-neutral-200 active:bg-neutral-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  children: React.ReactNode;
}

export function Button({
  variant,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {children}
    </button>
  );
}
