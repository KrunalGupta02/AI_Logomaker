"use client";
import React, { useState, Suspense } from "react";
import LogoTitle from "./_components/LogoTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoPallete from "./_components/LogoPallete";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";
import { useSearchParams } from "next/navigation";

function CreateLogo() {
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState(() => {
    return {
      title: searchParams?.get("title") ?? "", // Get title from URL
    };
  });

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log(formData);
  };

  return (
    <div className="mt-28 p-10 border rounded-xl 2xl:mx-40">
      {step == 1 ? (
        <LogoTitle
          onHandleInputChange={(v) => onHandleInputChange("title", v)}
          formData={formData}
        />
      ) : step == 2 ? (
        <LogoDesc
          onHandleInputChange={(v) => onHandleInputChange("desc", v)}
          formData={formData}
        />
      ) : step == 3 ? (
        <LogoPallete
          onHandleInputChange={(v) => onHandleInputChange("palette", v)}
          formData={formData}
        />
      ) : step == 4 ? (
        <LogoDesigns
          onHandleInputChange={(v) => onHandleInputChange("design", v)}
          formData={formData}
        />
      ) : step == 5 ? (
        <LogoIdea
          onHandleInputChange={(v) => onHandleInputChange("idea", v)}
          formData={formData}
        />
      ) : step == 6 ? (
        <PricingModel
          onHandleInputChange={(v) => onHandleInputChange("pricing", v)}
          formData={formData}
        />
      ) : null}
      <div className="flex items-center justify-between mt-10">
        {step !== 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft />
            Previous
          </Button>
        )}
        {step < 6 && (
          <Button onClick={() => setStep(step + 1)}>
            <ArrowRight />
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

// Wrap the component in a Suspense boundary

// The CreateLogo component is wrapped in a <Suspense> boundary in the CreateLogoWrapper component.
// The fallback prop of <Suspense> provides a loading state while the client-side code is being loaded.

// Both solutions ensure that useSearchParams() is only used in a client-side context.

export default function CreateLogoWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateLogo />
    </Suspense>
  );
}
