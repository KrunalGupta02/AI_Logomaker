"use client";

import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Info = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-primary text-3xl">
          {userDetail?.name ? `Hello, ${userDetail.name}` : "Loading..."}
        </h2>
        <div className="flex items-center gap-2">
          <Image src={"/coin.png"} width={40} height={40} alt="coin" />
          <h2 className="font-bold text-3xl">
            {userDetail?.credits} Credit Left
          </h2>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 ">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <Link href={"/create"}>
          <Button>+ Create New logo</Button>
        </Link>
      </div>
    </div>
  );
};

export default Info;
