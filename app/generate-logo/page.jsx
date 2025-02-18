"use client";

import React, { useContext } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";

const GenerateLogo = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return <div>GenerateLogo</div>;
};

export default GenerateLogo;
