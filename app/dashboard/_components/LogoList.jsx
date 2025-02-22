"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/configs/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const LogoList = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);

  useEffect(() => {
    userDetail && GetUserLogos();
  }, [userDetail]);

  // Get data from the Firestore DB
  const GetUserLogos = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", userDetail?.email, "logos")
    );
    setLogoList([]); // Reset the state before updating
    querySnapshot.forEach((doc) => {
      // Include the document ID with the logo data
      setLogoList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  // Share on Social Media function
  const shareOnSocials = (logo) => {
    setSelectedLogo(logo);
    setIsDialogOpen(true);
  };

  const getShareLinks = (logo) => {
    if (!logo || !logo.id) return null;

    // Get the base URL of your website
    const baseURL = window.location.origin;
    // Construct the share URL using the logo ID
    const shareURL = `${baseURL}/share/${logo.id}`;

    // Prepare share text
    const title = encodeURIComponent(logo.title || "Check out this logo!");
    const description = encodeURIComponent(
      logo.desc || "Look at this amazing logo!"
    );

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareURL
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareURL
      )}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareURL
      )}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%20${encodeURIComponent(
        shareURL
      )}`,
    };
  };

  return (
    <div className="my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {logoList.length > 0
          ? logoList.map((logo) => (
              <div
                key={logo.id}
                className="hover:scale-105 cursor-pointer transition-all border-2 p-2 border-gray-500 shadow-xl rounded-xl relative"
              >
                <Share2
                  onClick={() => shareOnSocials(logo)}
                  className="cursor-pointer right-2 absolute"
                  width={35}
                  height={35}
                />
                <Image
                  className="w-full rounded-full"
                  src={logo.image || "/loading.gif"}
                  alt={logo.title}
                  width={400}
                  height={200}
                />
                <h2 className="text-center text-lg font-medium mt-2">
                  {logo.title}
                </h2>
                <p className="text-sm text-gray-500 text-center">{logo.desc}</p>
              </div>
            ))
          : // Skeleton Effect for loading state
            [1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-slate-200 animate-pulse rounded-xl w-full h-48"
              ></div>
            ))}
      </div>

      {/* Alert Dialog with share buttons */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share this logo</AlertDialogTitle>
            <AlertDialogDescription>
              Click an icon below to share.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center">
            {selectedLogo && (
              <Image
                src={selectedLogo.image || "/loading.gif"}
                alt="Selected Logo"
                width={200}
                height={200}
                className="rounded-lg"
              />
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {selectedLogo && getShareLinks(selectedLogo) && (
              <>
                <a
                  href={getShareLinks(selectedLogo).facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Facebook
                    size={40}
                    className="text-blue-600 hover:scale-110 transition"
                  />
                </a>
                <a
                  href={getShareLinks(selectedLogo).twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Twitter
                    size={40}
                    className="text-blue-400 hover:scale-110 transition"
                  />
                </a>
                <a
                  href={getShareLinks(selectedLogo).linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Linkedin
                    size={40}
                    className="text-blue-700 hover:scale-110 transition"
                  />
                </a>
                <a
                  href={getShareLinks(selectedLogo).whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <MessageCircle
                    size={40}
                    className="text-green-500 hover:scale-110 transition"
                  />
                </a>
              </>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LogoList;
