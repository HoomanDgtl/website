import { PhoneInput } from "@/components/blackwell/phone-number-select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { CheckCircle2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .min(1, "First name is required*"),
  lastname: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .min(1, "Last name is required*"),
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .min(1, "Phone number is required*"),
  gpu_type_interest: z
    .string()
    .min(1, "Please select a GPU type")
    .min(1, "GPU type is required*"),
  current_amount_spent_on_computer: z
    .string()
    .min(1, "Please select your current compute spending"),
  website: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .min(1, "Company name is required*"),
  email: z
    .string()
    .email("Invalid business email")
    .min(1, "Business email is required*"),
  check: z
    .boolean()
    .refine((value) => value === true, "You must agree to the terms*"),
});

export function GpuContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      gpu_type_interest: "other",
      current_amount_spent_on_computer: "",
      website: "",
      email: "",
      check: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      const hubspotEndpoint =
        "https://api.hsforms.com/submissions/v3/integration/submit/47519938/2d95f20c-cd65-4648-94f1-df0732aa60e6";

      const formData = {
        fields: [
          { name: "firstname", value: values.firstname },
          { name: "lastname", value: values.lastname },
          { name: "email", value: values.email },
          { name: "website", value: values.website },
          { name: "gpu_type_interest", value: values.gpu_type_interest },
          {
            name: "current_amount_spent_on_computer",
            value: values.current_amount_spent_on_computer,
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
        setShowSuccessDialog(true);
        form.reset();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name*</FormLabel>
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
                <FormLabel>Last Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email*</FormLabel>
                <FormControl>
                  <Input placeholder="business@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Phone Number*</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput placeholder="+1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gpu_type_interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  GPU Type Needed (e.g., Blackwell, A100, H100, etc.)*
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select GPU type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="b300">B300</SelectItem>
                    <SelectItem value="b200">B200</SelectItem>
                    <SelectItem value="h200">H200</SelectItem>
                    <SelectItem value="h100">H100</SelectItem>
                    <SelectItem value="a100">A100</SelectItem>
                    <SelectItem value="other">
                      Other (A100, 4090..etc)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current_amount_spent_on_computer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How much are you currently spending on compute?*
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current spending" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="<$1000/mo">&lt;$1000/mo</SelectItem>
                    <SelectItem value="$1,000-$5,000">$1,000-$5,000</SelectItem>
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
          <FormField
            control={form.control}
            name="check"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                    <FormLabel>
                      I agree to receive other communications from Akash
                      Network.
                    </FormLabel>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="!mt-8 h-auto w-auto rounded-md px-6 py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </Button>
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
              Success!
            </DialogTitle>

            <DialogDescription
              className="px-4 text-center text-base leading-relaxed 
            text-gray-600 opacity-90"
            >
              Thank you for your interest! We've received your information and
              will be in touch soon with exciting updates.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
