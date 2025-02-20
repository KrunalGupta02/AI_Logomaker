"use client";

import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const LogoList = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState([]);

  useEffect(() => {
    userDetail && GetUserLogos();
  }, [userDetail]);

  const GetUserLogos = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    setLogoList([]); // Reset the state before updating
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
      setLogoList((prev) => [...prev, doc.data()]);
    });
  };

  const ViewLogo = (image) => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src='${image}' alt='bigImage'/>`);
  };

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {logoList.length > 0
          ? logoList.map((logo, index) => (
              <div
                key={index}
                className="hover:scale-105 cursor-pointer transition-all"
                onClick={() => ViewLogo(logo.image)}
              >
                <Image
                  className="w-full rounded-full"
                  src={logo?.image ? logo?.image : "/loading.gif"}
                  alt={logo?.title}
                  width={400}
                  height={200}
                />
                <h2 className="text-center text-lg font-medium mt-2">
                  {logo?.title}
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  {logo?.desc}
                </p>
              </div>
            ))
          : // Skeleton Effect for loading state
            [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px]"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default LogoList;
