import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useEffect } from "react";
import { buttonVariants } from "./button";
export default function TryAkashForm() {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "!h-auto !rounded py-[5px]",
          })}
        >
          Try Akash
        </button>
      </DialogTrigger>
      <DialogContent
        hideCloseButton
        className="overflow-hidden border-none p-0 shadow-none sm:max-w-[600px]"
      >
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
