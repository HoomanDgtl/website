import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "./button";

interface TryAkashFormProps {
  type: "hero" | "header";
  fullWidth?: boolean;
}

export default function TryAkashForm({ type, fullWidth }: TryAkashFormProps) {
  useEffect(() => {
    // Load HubSpot script
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/47519938.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const defaultButton = (
    <button
      type="button"
      className={buttonVariants({
        variant: "default",
        size: "sm",
        className: "!h-auto !rounded px-[11px] py-[7px] text-xs",
      })}
    >
      Try Akash
    </button>
  );

  const heroButton = (
    <button
      type="button"
      className={clsx(
        " cursor-pointer rounded-md bg-primary px-10 py-2.5  !font-medium text-white transition-all hover:bg-primary/90 md:px-[60px] md:py-5 lg:text-xl",
        fullWidth ? "w-full" : "mx-auto",
      )}
    >
      Access The Marketplace
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {type === "hero" ? heroButton : defaultButton}
      </DialogTrigger>
      <DialogContent
        hideCloseButton
        className="hide-scrollbar  max-h-[95vh] overflow-hidden overflow-y-auto !border-none bg-transparent  p-0 shadow-none sm:max-w-[600px]"
      >
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="absolute right-4 top-4 rounded-full bg-white p-2 text-black hover:bg-white/90"
        >
          <X className="h-4 w-4" />
        </button>
        <div
          className="hs-form-frame"
          data-region="na1"
          data-form-id="f6d48b8a-55fd-4327-b947-1ae5b33ed63f"
          data-portal-id="47519938"
        />
      </DialogContent>
    </Dialog>
  );
}
