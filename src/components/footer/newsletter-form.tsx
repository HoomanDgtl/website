import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { useState } from "react";

const PORTAL_ID = "47519938";
const FORM_ID = "2d808d3b-402c-4b34-a9aa-36ffe5026063";

function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function buildHSContext() {
  return {
    hutk: getCookie("hubspotutk"),
    pageUri: window.location.href,
    pageName: document.title,
  };
}

export default function NewsletterForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [{ name: "email", value: email }],
            context: buildHSContext(),
            skipValidation: false,
            includeFreemailSuggestions: true,
          }),
        },
      );

      if (res.ok) {
        setIsSuccess(true);
        setEmail("");
      } else {
        const data = await res.json().catch(() => null);
        setError(
          data?.message || "Submission failed. Please try again.",
        );
      }
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setIsOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setError("");
      setEmail("");
    }, 300);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center justify-center rounded-md border border-primary bg-primary/5 px-[13px] py-2 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white dark:border-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 rotate-45"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 12l-4-4-4 4" />
          <path d="M12 16V8" />
        </svg>
        Subscribe Now
      </button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          hideCloseButton
          className="bg-white p-0 shadow-xl sm:max-w-[440px] rounded-lg border-none"
        >
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>

          {isSuccess ? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-xl font-bold text-gray-900">
                  You're subscribed!
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Thank you for subscribing to the Akash Newsletter. You'll
                  receive the latest updates in your inbox.
                </DialogDescription>
              </DialogHeader>
            </div>
          ) : (
            <div className="p-6">
              <DialogHeader className="mb-6 space-y-2">
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Subscribe to Akash Newsletter
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Stay up to date with the latest from Akash Network.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="newsletter-email"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full border-gray-300 text-gray-900 placeholder:text-gray-400"
                    required
                  />
                  {error && (
                    <p className="mt-1.5 text-xs text-red-600">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subscribing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
