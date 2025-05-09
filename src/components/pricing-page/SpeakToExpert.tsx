import { cva, type VariantProps } from "class-variance-authority";
import TryAkashForm from "../home/hero/try-akash-form";

export const speakToExpertVariants = cva(
  "flex items-center justify-center border transition-all duration-300",
  {
    variants: {
      size: {
        default:
          "w-full gap-2 rounded-md py-[9px] text-sm md:py-2 md:text-base",
        small: "w-fit gap-2 rounded-md px-4 py-2 text-sm",
        "extra-small": "w-fit gap-1 rounded-[4px] px-2 py-1.5 text-xs",
      },
      variant: {
        primary:
          "border-primary dark:border-primary bg-primary/5 text-primary hover:bg-primary hover:text-white",
        secondary:
          "bg-white text-gray-600 hover:border-primary hover:text-primary",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
  },
);

interface SpeakToExpertProps
  extends VariantProps<typeof speakToExpertVariants> {
  className?: string;
}

const SpeakToExpert = ({ size, variant, className }: SpeakToExpertProps) => {
  return (
    <TryAkashForm
      type="speakToExpertHeader"
      size={size}
      variant={variant}
      className={className}
    />
  );
};

export default SpeakToExpert;
