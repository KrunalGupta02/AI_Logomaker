"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";

// Lazy load the DarkLightModeBtn component so that hydration errors are avoided
const DarkLightModeBtn = dynamic(() => import('./DarkLightModeBtn'), { ssr: false });

function Header() {
  const { user } = useUser();
  return (
    <div className="px-10 lg:px-12 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-lg sticky top-0 z-50 bg-white">
      <Link href={"/"} className="inline-block">
        <Image src={"/mainLogo.png"} alt="logo" width={100} height={100} />
      </Link>


      <div className="flex gap-3 items-center">
        <DarkLightModeBtn />
        {user ? (
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <Link href={"/create"}>
            <Button>Get Started</Button>
          </Link>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
