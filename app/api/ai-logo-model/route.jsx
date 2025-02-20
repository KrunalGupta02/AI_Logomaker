import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { toast } from "sonner";

export async function POST(req) {
  const { prompt, email, title, desc, type, userCredits } = await req.json();

  let base64ImageWithMime = "";

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    // Generate AI Text Prompt for Logo
    const AIPromptResult = await AILogoPrompt.sendMessage(prompt);
    const AIPrompt = AIPromptResult.response.text().prompt;

    // Format the prompt correctly for Hugging Face
    const formattedPrompt = {
      inputs: prompt, // Use the original prompt directly
    };

    // Generate Logo From AI Model
    if (type == "Free") {
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
        formattedPrompt,
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
      // Convert to Base64 Image
      const buffer = Buffer.from(response.data, "binary");
      const base64Image = buffer.toString("base64");
      base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    }
    // Paid Model start from here
    else {
      // Return subscription required message instead of attempting to generate
      // ! This replicate API need subscription so all the code below is commented out
      // Replicate API Endpoint for Paid Model
      // const output = await replicate.run(
      //   "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
      //   {
      //     input: {
      //       prompt: formattedPrompt,
      //       num_outputs: 1,
      //       aspect_ratio: "1:1",
      //       output_format: "png",
      //       guidance_scale: 3.5,
      //       output_quality: 80,
      //       num_inference_steps: 8,
      //     },
      //   }
      // );
      // console.log(output);
      // base64ImageWithMime = await ConverImageToBase64(output);
      // // Update the credits with firestore DB
      // const docRef = doc(db, "users", email);
      // await updateDoc(docRef, {
      //   credits: Number(userCredits) - 1,
      // });
    }

    // Save to Firebase DB
    try {
      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: base64ImageWithMime,
        title: title,
        desc: desc,
      });
    } catch (e) {
      console.error("Firebase error:", e);
    }

    return NextResponse.json({ image: base64ImageWithMime });
  } catch (e) {
    console.error("Error:", e.response?.data || e);
    return NextResponse.json(
      {
        error: e.message,
        details: e.response?.data,
      },
      {
        status: e.response?.status || 500,
      }
    );
  }
}

async function ConverImageToBase64(image) {
  const resp = await axios.get(image, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");

  return `data:image/png;base64,${base64ImageRaw}`;
}
