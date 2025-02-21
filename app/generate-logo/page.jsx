"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "@/app/_components/_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Download, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Lookup from "../_components/_data/Lookup";

const GenerateLogo = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [formData, setFormData] = useState();

  const [loading, setLoading] = useState(false);

  const [logoImage, setLogoImage] = useState();

  const searchParams = useSearchParams();

  const modelType = searchParams.get("type");

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

  // Clear the localStorage when the logoImage is updated
  useEffect(() => {
    if (typeof window != undefined && logoImage) {
      localStorage.clear();
    }
  }, [logoImage]);

  // Image Download Code
  const handleImgDownload = (imageSrc) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "AiImage.png"; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Img generation function from AI Model
  const GenerateAILogo = async () => {
    if (modelType !== "Free" && userDetail?.credits <= 0) {
      toast("You don't have enough credits to generate the logo");
      return;
    }

    setLoading(true);

    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    console.log(PROMPT);

    try {
      // Generate Logo Prompt from AI
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userDetail.email,
        title: formData?.title,
        desc: formData?.desc,
        type: modelType,
        userCredits: userDetail.credits,
      });

      console.log(result.data, "data");
      setLoading(false);
      setLogoImage(result.data?.image);
    } catch (error) {
      // Handle API errors gracefully
      setLoading(false);

      // Check if the error is a 500 Internal Server Error
      if (error.response && error.response.status === 500) {
        toast.error("Oops! Something went wrong.", {
          description: "Please refresh the page and try again.",
          action: {
            label: "Refresh",
            onClick: () => window.location.reload(), // Refresh the page on click
          },
        });
      } else {
        toast.error("An unexpected error occurred.", {
          description: "Please try again later.",
        });
      }
    }
  };

  return (
    <div>
      <div className="mt-12 flex flex-col items-center justify-center ">
        <header>
          {loading && (
            <>
              <h3 className="text-4xl text-primary font-bold mb-1">
                {Lookup.LoadingWaitTitle}
              </h3>
              <Image
                src={"/loading.gif"}
                className="m-auto"
                width={300}
                height={300}
                alt="loading"
              />
              <p className="text-xl my-2 mb-5">{Lookup.LoadingWaitDesc}</p>
            </>
          )}
        </header>

        {!loading && (
          <h1 className="text-primary font-bold text-4xl mb-8">
            Your logo is being created
          </h1>
        )}

        {!loading && (
          <Image
            src={logoImage ? logoImage : "/design_1.png"}
            alt="logo"
            width={300}
            height={300}
            className="rounded-xl"
            priority="true"
          />
        )}
      </div>

      {!loading && (
        <div className="flex justify-center items-center mt-9 gap-8">
          <button
            onClick={() =>
              handleImgDownload(logoImage ? logoImage : "/design_1.png")
            }
            className="flex items-center gap-2 bg-primary text-white shadow-xl p-2 px-1.5 rounded-lg text-base"
          >
            <Download />
            Download
          </button>
          <Link
            className="flex items-center gap-2 border rounded-lg shadow-xl border-[#e5e7eb] p-2 px-1.5 text-base"
            href={"/dashboard"}
          >
            <LayoutDashboard />
            Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default GenerateLogo;
