import { AILogoPrompt } from "@/configs/AiModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    // Generate AI Text Prompt for Logo
    const AIPromptResult = await AILogoPrompt.sendMessage(prompt);
    const AIPrompt = AIPromptResult.response.text().prompt;
    console.log(JSON.parse(AIPrompt));

    // Generate Logo From AI Model
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
      AIPrompt,
      {
        headers: {
          Authorization: "Bearer" + process.env.HUGGING_FACE_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
    // Convert to Base64 Image
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");

    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

    console.log(base64ImageWithMime);

    // Save to Firebase DB

    return NextResponse.json({ image: base64ImageWithMime });

    // Pass it to AI Image Model
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
