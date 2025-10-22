import { PhoneInput } from "@/components/blackwell/phone-number-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import "react-phone-number-input/style.css";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    country: string;
    lead_type: string;
    company: string;
    website: string;
    project_details: string;
    current_amount_spent_on_computer: string;
    provider_gpu_type: string[];
    gpu_quantity_available: string;
    support_request_info: string;
  }>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: "IN",
    lead_type: "",
    company: "",
    website: "",
    project_details: "",
    current_amount_spent_on_computer: "",
    provider_gpu_type: [],
    gpu_quantity_available: "",
    support_request_info: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState("");

  function formFieldsToHSJSON() {
    const result = [];
    for (const [name, value] of Object.entries(formData)) {
      if (name === "provider_gpu_type") {
        const fieldValue =
          Array.isArray(value) && value.length > 0 ? value.join(", ") : "null";
        result.push({
          name: "provider_gpu_type",
          value: fieldValue,
        });
      } else {
        const fieldValue = value === "" ? "null" : value;
        result.push({ name, value: fieldValue });
      }
    }
    return result;
  }

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

  function validateStep1() {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstname) newErrors.firstname = "First Name is required";
    if (!formData.lastname) newErrors.lastname = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.lead_type) newErrors.lead_type = "Please select an option";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2() {
    const newErrors: { [key: string]: string } = {};
    if (!formData.company)
      newErrors.company = "Company / Project Name is required";

    // Rent GPUs validation
    if (
      formData.lead_type === "Developer" &&
      !formData.current_amount_spent_on_computer
    ) {
      newErrors.current_amount_spent_on_computer =
        "Please select your current compute spend";
    }
    // Provide GPUs validation
    if (formData.lead_type === "Provider") {
      if (
        !formData.provider_gpu_type ||
        formData.provider_gpu_type.length === 0
      ) {
        newErrors.provider_gpu_type = "Please select at least one GPU type";
      }
      if (!formData.gpu_quantity_available) {
        newErrors.gpu_quantity_available = "Please select GPU quantity";
      }
    }
    // Support validation
    if (
      formData.lead_type === "technical support" &&
      !formData.support_request_info
    ) {
      newErrors.support_request_info = "Please provide support request info";
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
      return;
    }
    if (!validateStep2()) return;
    setIsSubmitting(true);
    const submission = {
      fields: formFieldsToHSJSON(),
      context: buildHSContext(),
    };
    try {
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/47519938/f6d48b8a-55fd-4327-b947-1ae5b33ed63f",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
        },
      );
      if (res.ok) {
        setSubmitError("");

        try {
          const responseData = await res.json();
          if (responseData.redirectUri) {
            window.location.href = responseData.redirectUri;
            return;
          } else {
            setShowSuccessDialog(true);
          }
        } catch (err) {}
      } else {
        setSubmitError("Submission failed. Please try again.");
      }
    } catch (error) {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handlePhoneChange(value: string | undefined) {
    setFormData((prev) => ({ ...prev, phone: value || "" }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  }

  function handleRadioChange(option: string) {
    // Map display labels to CRM values
    let leadTypeValue = "";
    if (option === "Rent GPUs") {
      leadTypeValue = "Developer";
    } else if (option === "Provide GPUs") {
      leadTypeValue = "Provider";
    } else if (option === "Get technical support") {
      leadTypeValue = "technical support";
    } else {
      leadTypeValue = "Other";
    }

    setFormData((prev) => ({
      ...prev,
      lead_type: leadTypeValue,
    }));
    setErrors((prev) => ({ ...prev, lead_type: "" }));
  }

  function handleGpuTypeChange(option: string) {
    setFormData((prev) => {
      const arr = prev.provider_gpu_type;
      if (arr.includes(option)) {
        return {
          ...prev,
          provider_gpu_type: arr.filter((o) => o !== option),
        };
      } else {
        return {
          ...prev,
          provider_gpu_type: [...arr, option],
        };
      }
    });
    setErrors((prev) => ({ ...prev, provider_gpu_type: "" }));
  }

  function handleBack() {
    setStep(1);
  }

  function resetForm() {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      country: "IN",
      lead_type: "",
      company: "",
      website: "",
      project_details: "",
      current_amount_spent_on_computer: "",
      provider_gpu_type: [],
      gpu_quantity_available: "",
      support_request_info: "",
    });
    setErrors({});
    setSubmitError("");
    setShowSuccessDialog(false);
    setStep(1);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {submitError && (
          <div className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
            {submitError}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm ">First Name</label>
                <Input
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="w-full border  bg-background2 text-foreground"
                />
                {errors.firstname && (
                  <span className="text-xs text-red-400">
                    {errors.firstname}
                  </span>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm">Last Name</label>
                <Input
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="w-full border  bg-background2 "
                />
                {errors.lastname && (
                  <span className="text-xs text-red-400">
                    {errors.lastname}
                  </span>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm">
                  Email<span className="text-red-400">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border  bg-background2 "
                />
                {errors.email && (
                  <span className="text-xs text-red-400">{errors.email}</span>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm">Phone Number</label>
                <PhoneInput
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  modal={true}
                />
                {errors.phone && (
                  <span className="text-xs text-red-400">{errors.phone}</span>
                )}
              </div>
            </div>
            <div>
              <label className="mb-3 block text-sm">
                What would you like to do on Akash?
                <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-col gap-3">
                {[
                  "Rent GPUs",
                  "Provide GPUs",
                  "Get technical support",
                  "Other",
                ].map((option) => (
                  <label
                    key={option}
                    className="group flex cursor-pointer items-center gap-3"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="lead_type"
                        value={option}
                        checked={
                          (option === "Rent GPUs" &&
                            formData.lead_type === "Developer") ||
                          (option === "Provide GPUs" &&
                            formData.lead_type === "Provider") ||
                          (option === "Get technical support" &&
                            formData.lead_type === "technical support") ||
                          (option === "Other" && formData.lead_type === "Other")
                        }
                        onChange={() => handleRadioChange(option)}
                        className="sr-only"
                      />
                      <div
                        className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                          (option === "Rent GPUs" &&
                            formData.lead_type === "Developer") ||
                          (option === "Provide GPUs" &&
                            formData.lead_type === "Provider") ||
                          (option === "Get technical support" &&
                            formData.lead_type === "technical support") ||
                          (option === "Other" && formData.lead_type === "Other")
                            ? "border-primary bg-primary"
                            : "border-gray-300 group-hover:border-primary/50"
                        }`}
                      >
                        {((option === "Rent GPUs" &&
                          formData.lead_type === "Developer") ||
                          (option === "Provide GPUs" &&
                            formData.lead_type === "Provider") ||
                          (option === "Get technical support" &&
                            formData.lead_type === "technical support") ||
                          (option === "Other" &&
                            formData.lead_type === "Other")) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium leading-none">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
              {errors.lead_type && (
                <span className="mt-2 block text-xs text-red-400">
                  {errors.lead_type}
                </span>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className=" w-min px-10"
                disabled={isSubmitting}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <label className="mb-1 block text-sm">
                Company / Project Name
                <span className="text-red-400">*</span>
              </label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full border  bg-background2 "
              />
              {errors.company && (
                <span className="text-xs text-red-400">{errors.company}</span>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm">Website URL</label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full border  bg-background2 "
              />
            </div>
            {/* Rent GPUs conditional field */}
            {formData.lead_type === "Developer" && (
              <div>
                <label className="mb-3 block text-sm">
                  How much are you currently spending on compute?
                  <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-col gap-3">
                  {[
                    { value: "<$1000/mo", label: "$0-$1,000/mo" },
                    { value: "$1,000-$5,000", label: "$1,000-$5,000" },
                    { value: "$5,000-$25,000", label: "$5,000-$25,000" },
                    { value: "$25,000+", label: "$25,000+" },
                    {
                      value: "No Spend Currently",
                      label: "No Spend Currently",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="group flex cursor-pointer items-center gap-3"
                    >
                      <div className="relative">
                        <input
                          type="radio"
                          name="current_amount_spent_on_computer"
                          value={option.value}
                          checked={
                            formData.current_amount_spent_on_computer ===
                            option.value
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              current_amount_spent_on_computer: e.target.value,
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              current_amount_spent_on_computer: "",
                            }));
                          }}
                          className="sr-only"
                        />
                        <div
                          className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                            formData.current_amount_spent_on_computer ===
                            option.value
                              ? "border-primary bg-primary"
                              : "border-gray-300 group-hover:border-primary/50"
                          }`}
                        >
                          {formData.current_amount_spent_on_computer ===
                            option.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium leading-none">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.current_amount_spent_on_computer && (
                  <span className="mt-2 block text-xs text-red-400">
                    {errors.current_amount_spent_on_computer}
                  </span>
                )}
              </div>
            )}
            {/* Provide GPUs conditional fields */}
            {formData.lead_type === "Provider" && (
              <>
                <div>
                  <label className="mb-3 block text-sm">
                    What type of GPUs do you want to provide?
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="space-y-3">
                    {["H200", "H100", "A100", "RTX4090", "A6000", "Other"].map(
                      (gpuType) => (
                        <div
                          key={gpuType}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox
                            id={`gpu-type-${gpuType}`}
                            checked={formData.provider_gpu_type.includes(
                              gpuType,
                            )}
                            onCheckedChange={() => handleGpuTypeChange(gpuType)}
                          />
                          <label
                            htmlFor={`gpu-type-${gpuType}`}
                            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {gpuType}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                  {errors.provider_gpu_type && (
                    <span className="mt-2 block text-xs text-red-400">
                      {errors.provider_gpu_type}
                    </span>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm">
                    How many total GPUs do you want to provide?
                    <span className="text-red-400">*</span>
                  </label>
                  <Select
                    value={formData.gpu_quantity_available}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        gpu_quantity_available: value,
                      }));
                      setErrors((prev) => ({
                        ...prev,
                        gpu_quantity_available: "",
                      }));
                    }}
                  >
                    <SelectTrigger className="bg-background2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[102]">
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2-5">2-5</SelectItem>
                      <SelectItem value="5-10">5-10</SelectItem>
                      <SelectItem value="10+">10+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gpu_quantity_available && (
                    <span className="text-xs text-red-400">
                      {errors.gpu_quantity_available}
                    </span>
                  )}
                </div>
              </>
            )}
            {/* Support Request conditional field */}
            {formData.lead_type === "technical support" && (
              <div>
                <label className="mb-1 block text-sm">
                  Support Request Info
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="support_request_info"
                  value={formData.support_request_info}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded border bg-background2 px-3 py-2 text-sm focus:outline-none"
                  required
                />
                {errors.support_request_info && (
                  <span className="text-xs text-red-400">
                    {errors.support_request_info}
                  </span>
                )}
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm">Project Details</label>
              <textarea
                name="project_details"
                value={formData.project_details}
                onChange={handleChange}
                rows={4}
                className="w-full rounded border bg-background2  px-3 py-2 text-sm  focus:outline-none"
              />
            </div>
            <div className="mt-4 flex justify-between  gap-2">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="w-min px-10"
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                type="submit"
                className=" w-min px-10"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </>
        )}
      </form>

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
