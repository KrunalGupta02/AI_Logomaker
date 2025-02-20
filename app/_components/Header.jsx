"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();
  return (
    <div className="px-10 lg:px-12 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="logo" width={180} height={100} />
      </Link>
      <div className="flex gap-3 items-center">
        {user ? (
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <Button>Get Started</Button>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
