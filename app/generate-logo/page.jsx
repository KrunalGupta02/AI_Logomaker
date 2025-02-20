"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "@/app/_components/_data/Prompt";
import axios from "axios";
import Image from "next/image";

const GenerateLogo = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [formData, setFormData] = useState();

  const [loading, setLoading] = useState(false);

  const [logoImage, setLogoImage] = useState();

  useEffect(() => {
    if (typeof window != undefined && userDetail?.email) {
      const storage = localStorage.getItem("formData");

      if (storage) {
        setFormData(JSON.parse(storage));
        console.log("Formdata from Local Storage", JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  const GenerateAILogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    console.log(PROMPT);

    // Generate Logo Prompt from AI
    // Generate Logo Image from AI

    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail.email,
      title: formData?.title,
      desc: formData?.desc,
    });
    console.log(result.data, "data");
    setLoading(false);
    setLogoImage(result.data?.image);
  };

  return (
    <div>
      <div>
        <h1>{loading && "Loading..."}</h1>
        {!loading && (
          <Image
            src={logoImage ? logoImage : "/design_1.png"}
            alt="logo"
            width={200}
            height={200}
          />
        )}
      </div>
    </div>
  );
};

export default GenerateLogo;
