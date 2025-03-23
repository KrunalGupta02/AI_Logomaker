"use client";

import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "./_context/UserDetailContext";
import Footer from "./_components/Footer";
import { ThemeProvider } from "next-themes";

const Provider = ({ children }) => {
  const { user } = useUser();
  // console.log(user, "clerkUser");

  const [userDetail, setUserDetail] = useState();

  // Check user auth available for not
  useEffect(() => {
    user && CheckUserAuth();
  }, [user]);

  // Save user data
  const CheckUserAuth = async () => {
    // Save user to db
    const result = await axios.post("/api/users", {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });
    console.log("result", result.data);
    setUserDetail(result.data);
  };
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 px-10 lg:px-12 xl:px-48 2xl:px-56">
            {children}
          </div>
          <Footer />
        </div>
      </UserDetailContext.Provider>
    </ThemeProvider>
  );
};

export default Provider;
