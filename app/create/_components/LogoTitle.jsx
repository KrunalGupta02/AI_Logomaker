"use client";

import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_components/_data/Lookup";
import { useSearchParams } from "next/navigation";

// Receives onHandleInputChange from parent to update the title state
const LogoTitle = ({ onHandleInputChange }) => {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams?.get("title") ?? "");

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup?.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />

      <input
        type="text"
        placeholder={Lookup.InputTitlePlaceholder}
        className="p-4 border rounded-lg mt-5 w-full "
        defaultValue={title}
        onChange={(e) => onHandleInputChange(e.target.value)} // Passes i/p value to parent
      />
    </div>
  );
};

// Wrap the component in a Suspense boundary
export default function LogoTitleWrapper() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <LogoTitle />
    </Suspense>
  );
}
