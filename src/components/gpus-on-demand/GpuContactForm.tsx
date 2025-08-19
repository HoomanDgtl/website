import { PhoneInput } from "@/components/blackwell/phone-number-select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ExternalLink } from "lucide-react";

const formSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .min(1, "First name is required*"),
  lastname: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .min(1, "Last name is required*"),
  phone: z.string().min(10, "Invalid phone number").optional(),
  email: z
    .string()
    .email("Invalid business email")
    .min(1, "Business email is required*"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .min(1, "Company name is required*"),
  website: z.string().optional(),
  project_details: z.string().optional(),
  lead_type: z.string().min(1, "Please select an option"),
  current_amount_spent_on_computer: z.string().optional().nullable(),
  provider_gpu_type: z.string().optional().nullable(),
  gpu_quantity_available: z.string().optional().nullable(),
  support_request_info: z.string().optional(),
});

export function GpuContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [redirectUri, setRedirectUri] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      company: "",
      website: "",
      project_details: "",
      lead_type: "",
      current_amount_spent_on_computer: null,
      provider_gpu_type: null,
      gpu_quantity_available: null,
      support_request_info: "",
    },
  });

  const watchedUseCases = form.watch("lead_type");

  const shouldShowRedirectDialog = () => {
    return redirectUri !== null;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showSuccessDialog && shouldShowRedirectDialog() && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && shouldShowRedirectDialog()) {
      window.open(redirectUri!, "_blank");
      setShowSuccessDialog(false);
      setCountdown(5);
      setRedirectUri(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showSuccessDialog, countdown, redirectUri]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      if (!values.phone) {
        form.setError("phone", { message: "Phone number is required" });
        return;
      }

      const hubspotEndpoint =
        "https://api.hsforms.com/submissions/v3/integration/submit/47519938/f6d48b8a-55fd-4327-b947-1ae5b33ed63f";

      const formData = {
        fields: [
          { name: "firstname", value: values.firstname },
          { name: "lastname", value: values.lastname },
          { name: "email", value: values.email },
          { name: "company", value: values.company },
          { name: "website", value: values.website },
          { name: "project_details", value: values.project_details },
          {
            name: "lead_type",
            value: values.lead_type,
          },
          {
            name: "current_amount_spent_on_computer",
            value: values.current_amount_spent_on_computer || "null",
          },
          {
            name: "provider_gpu_type",
            value: values.provider_gpu_type || "null",
          },
          {
            name: "gpu_quantity_available",
            value: values.gpu_quantity_available || "null",
          },
          {
            name: "support_request_info",
            value: values.support_request_info,
          },
          { name: "phone", value: values.phone },
        ],
        context: {
          pageUri: window.location.href,
          pageName: "GPU Contact Form",
        },
      };

      const response = await fetch(hubspotEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.redirectUri) {
          setRedirectUri(responseData.redirectUri);
        }

        form.reset();
        setShowSuccessDialog(true);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleNextStep = () => {
    const currentValues = form.getValues();

    // Validate required fields for step 1
    const requiredFields = ["lead_type"];
    if (currentValues.lead_type === "Rent GPUs") {
      requiredFields.push(
        "firstname",
        "lastname",
        "email",
        "company",
        "current_amount_spent_on_computer",
      );
    } else {
      requiredFields.push("firstname", "lastname", "email", "company");
    }

    const hasErrors = requiredFields.some((field) => {
      const value = currentValues[field as keyof typeof currentValues];
      return !value || value === "";
    });

    if (!hasErrors) {
      setCurrentStep(2);
    } else {
      // Trigger validation to show errors
      form.trigger(requiredFields as any);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* Step 1: Lead Type Selection */}
              <FormField
                control={form.control}
                name="lead_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What would you like to do on Akash?
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        {[
                          "Rent GPUs",
                          "Provide GPUs",
                          "Get technical support",
                          "Other",
                        ].map((option) => (
                          <label
                            key={option}
                            className="group relative flex cursor-pointer items-center gap-3 rounded-lg border bg-background p-4 transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:shadow-sm"
                          >
                            <div className="relative hidden h-5 w-5 items-center justify-center">
                              <input
                                type="radio"
                                name="lead_type"
                                value={option}
                                checked={field.value === option}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange(option);
                                  }
                                }}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-all duration-200 checked:border-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                              <div className="pointer-events-none absolute h-2 w-2 rounded-full bg-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
                            </div>
                            <span className="text-sm font-medium transition-colors duration-200 group-hover:text-primary">
                              {option}
                            </span>
                            {field.value === option && (
                              <div className="ml-auto">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Show additional fields only after selection */}
              {watchedUseCases && (
                <>
                  {/* First Name and Last Name on same line */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First Name
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="business@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company / Project Name{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Conditional field for Rent GPUs */}
                  {watchedUseCases === "Rent GPUs" && (
                    <FormField
                      control={form.control}
                      name="current_amount_spent_on_computer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            How much are you currently spending on compute?
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your current spending" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="<$1000/mo">
                                &lt;$1000/mo
                              </SelectItem>
                              <SelectItem value="$1,000-$5,000">
                                $1,000-$5,000
                              </SelectItem>
                              <SelectItem value="$5,000-$25,000">
                                $5,000-$25,000
                              </SelectItem>
                              <SelectItem value="$25,000+">$25,000+</SelectItem>
                              <SelectItem value="No Spend Currently">
                                No Spend Currently
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="!mt-8 h-auto w-auto rounded-md px-6 py-3"
                  >
                    Next
                  </Button>
                </>
              )}
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Step 2: Additional Details */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold">
                  Share any additional details about your project
                </h3>
              </div>

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="project_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Project Details"
                        rows={4}
                        className="w-full rounded border bg-background px-3 py-2 text-sm focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional fields for other lead types */}
              {watchedUseCases === "Provide GPUs" && (
                <>
                  <FormField
                    control={form.control}
                    name="provider_gpu_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What type of GPUs do you want to provide?
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select GPU type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="H200">H200</SelectItem>
                            <SelectItem value="H100">H100</SelectItem>
                            <SelectItem value="A100">A100</SelectItem>
                            <SelectItem value="RTX4090">RTX4090</SelectItem>
                            <SelectItem value="A6000">A6000</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gpu_quantity_available"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          How many total GPUs do you want to provide?
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quantity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2-5">2-5</SelectItem>
                            <SelectItem value="5-10">5-10</SelectItem>
                            <SelectItem value="10+">10+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {watchedUseCases === "Get technical support" && (
                <FormField
                  control={form.control}
                  name="support_request_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Support Request Info
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Describe your support request"
                          rows={3}
                          className="w-full rounded border bg-background2 px-3 py-2 text-sm focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput placeholder="+1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="!mt-8 text-xs text-para md:text-sm">
                By clicking submit below, you consent to allow Akash Network to
                store and process the personal information submitted above to
                provide you the content requested. Please review our{" "}
                <a
                  target="_blank"
                  href="/privacy"
                  className="text-primary underline"
                >
                  privacy policy
                </a>{" "}
                for more information.
              </p>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="!mt-8 h-auto w-auto rounded-md px-6 py-3"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="!mt-8 h-auto w-auto rounded-md px-6 py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="animate-fade-in rounded-xl bg-white shadow-2xl sm:max-w-md">
          <DialogHeader className="space-y-4">
            <div className="animate-bounce-in flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 " />
            </div>

            <DialogTitle
              className="flex items-center justify-center gap-2 
            text-center text-2xl font-bold tracking-tight text-gray-800"
            >
              {shouldShowRedirectDialog()
                ? "Success! Redirecting..."
                : "Success!"}
            </DialogTitle>

            <DialogDescription
              className="px-4 text-center text-base leading-relaxed 
            text-gray-600 opacity-90"
            >
              {shouldShowRedirectDialog()
                ? "Thank you for your interest! We're redirecting you to schedule a meeting with our team."
                : "Thank you for your interest! We've received your information and will be in touch soon with exciting updates."}
            </DialogDescription>

            {shouldShowRedirectDialog() && (
              <div className="flex flex-col items-center space-y-4">
                <div className="text-center">
                  <p className="mb-2 text-sm text-gray-600">Redirecting in:</p>
                  <div className="text-3xl font-bold text-primary">
                    {countdown}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-sm text-gray-600">
                    Or click below to schedule now:
                  </p>
                  <Button
                    onClick={() => {
                      window.open(redirectUri!, "_blank");
                      setShowSuccessDialog(false);
                      setCountdown(5);
                      setRedirectUri(null);
                    }}
                    className="flex items-center gap-2"
                  >
                    Schedule Meeting
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
