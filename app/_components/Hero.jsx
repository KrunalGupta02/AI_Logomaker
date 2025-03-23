"use client";

import React, { useState } from "react";
import Lookup from "./_data/Lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

function Hero() {
  const [logoTitle, setLogoTitle] = useState();
  const { resolvedTheme } = useTheme();

  let src;

  switch (resolvedTheme) {
    case 'light':
      src = '/landing.png';
      break;
    case 'dark':
      src = '/dark_landing.png';
      break;
    default:
      src = '/landing.png';
      break;
  }

  return (
    <div className="flex items-center mt-24 flex-col gap-5">
      <h2 className="text-primary text-5xl text-center font-bold">
        {Lookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {Lookup.HeroSubheading}
      </h2>
      <p className="text-lg text-gray-500 text-center">{Lookup.HeroDesc}</p>

      <div className="flex gap-6 w-full max-w-2xl mt-10 items-center">
        <input
          placeholder={Lookup.InputTitlePlaceholder}
          className="p-3 border rounded-md w-full shadow-md"
          onChange={(e) => setLogoTitle(e.target.value)}
        />

        {/* Adding the route with the url params */}
        <Link href={"/create?title=" + logoTitle}>
          <Button className="w-full p-6">Get Started</Button>
        </Link>
      </div>
      <Image
        src={src}
        width={1500}
        height={500}
        alt="heroImg"
        suppressHydrationWarning
      />
    </div>
  );
}

export default Hero;
