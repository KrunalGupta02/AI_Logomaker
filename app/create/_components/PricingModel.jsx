"use client";

import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_components/_data/Lookup";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const PricingModel = ({ formData }) => {
  console.log("pricing", formData);

  const { user } = useUser();

  // Save the formdata to the localstorage
  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div className="">
      <HeadingDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {Lookup.pricingOption.map((pricing, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 border rounded-xl"
          >
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
            />
            <h2 className="font-medium text-2xl">{pricing.title}</h2>
            <div>
              {pricing.features.map((feature, index) => (
                <h2 key={index} className="text-lg mt-2 ">
                  {feature}
                </h2>
              ))}
            </div>

            {/* Redirect button for sign in  */}

            {/* Conditional Rendering for Free and Premium */}
            {pricing.title === "Premium" ? (
              // Show Sonner Toast for Premium
              <Button
                className="mt-5"
                onClick={() =>
                  toast("Premium feature coming soon!", {
                    description: "We are working on this feature.",
                    action: {
                      label: "Dismiss",
                      onClick: () => console.log("Toast dismissed"),
                    },
                  })
                }
              >
                {pricing.button}
              </Button>
            ) : user ? (
              // Redirect for Free users who are signed in
              <Link href={"/generate-logo?type=" + pricing.title}>
                <Button className="mt-5">{pricing.button}</Button>
              </Link>
            ) : (
              // Sign In Button for Free users who are not signed in
              <SignInButton
                mode="modal"
                forceRedirectUrl={"/generate-logo?type=" + pricing.title}
              >
                <Button className="mt-5">{pricing.button}</Button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingModel;
