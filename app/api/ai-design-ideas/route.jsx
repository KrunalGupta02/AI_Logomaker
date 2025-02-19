import { AIDesignIdea } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  //Extracting the Prompt from Request Body
  const { prompt } = await req.json();

  try {
    // Sending the Prompt to AI Model
    const result = await AIDesignIdea.sendMessage(prompt);
    //  Returning the AI Response
    return NextResponse.json({
      success: true,
      data: JSON.parse(result.response.text()),
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
}

//? NextResponse:-
/*
NextResponse is a Next.js utility for handling responses in API routes.

- Format API responses as JSON
- Supporting setting headers , cookies and status code.
- Optimized for Edge and serverless functions

It's similar to Response in native fetch API, but tailored for Next.js! 🚀
 */
