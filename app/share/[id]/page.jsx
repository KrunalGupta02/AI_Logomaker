"use client";

import { db } from "@/configs/FirebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SharePage({ params }) {
  const { id } = params;
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        setLoading(true);
        // Query all users' collections since we don't know which user owns this logo
        const usersSnapshot = await getDocs(collection(db, "users"));

        let foundLogo = null;
        // Search through each user's logos collection
        for (const userDoc of usersSnapshot.docs) {
          const logoDoc = await getDoc(
            doc(db, "users", userDoc.id, "logos", id)
          );
          if (logoDoc.exists()) {
            foundLogo = { id: logoDoc.id, ...logoDoc.data() };
            break;
          }
        }

        if (foundLogo) {
          setLogo(foundLogo);
        } else {
          setError("Logo not found");
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
        setError("Failed to load logo");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLogo();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-slate-200 animate-pulse rounded-xl w-96 h-96"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!logo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Not Found</CardTitle>
            <CardDescription>
              The requested logo could not be found.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{logo.title}</CardTitle>
          <CardDescription>{logo.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Image
              src={logo.image || "/loading.gif"}
              alt={logo.title}
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Created with Logo Generator</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
