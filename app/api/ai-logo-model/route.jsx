import { AILogoPrompt } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    // Generate AI Text Prompt for Logo
    const AIPromptResult = await AILogoPrompt.sendMessage(prompt);
    console.log(JSON.parse(AIPromptResult.response.text()).prompt);

    return NextResponse.json(JSON.parse(AIPromptResult.response.text()).prompt);

    // Pass it to AI Image Model
  } catch (e) {}
}
