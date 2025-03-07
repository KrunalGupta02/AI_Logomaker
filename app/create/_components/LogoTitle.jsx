"use client";

import React, { Suspense, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_components/_data/Lookup";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// Receives onHandleInputChange from parent to update the title state
const LogoTitle = ({ onHandleInputChange }) => {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams?.get("title") ?? "");

  const pathname = usePathname();
  const router = useRouter();

  // Below function is used to change the title of url dynamically when user changes in i/p
  const handleUrlTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onHandleInputChange(newTitle);

    // Update url without reloading the page
    const params = new URLSearchParams(searchParams);
    params.set("title", newTitle);
    router.replace(`${pathname}?${params.toString()}`);
  };

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
        value={title}
        onChange={handleUrlTitleChange} // Passes i/p value to parent
      />
    </div>
  );
};

// Wrap the component in a Suspense boundary
export default function LogoTitleWrapper({ onHandleInputChange }) {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <LogoTitle onHandleInputChange={onHandleInputChange} />
    </Suspense>
  );
}
