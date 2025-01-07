import Image from "next/image";
import React from "react";
import logo from "/public/logo.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  return (
    <div className="px-10 lg:px-12 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={180} height={100} />
      </Link>
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
