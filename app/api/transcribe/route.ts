import { NextResponse } from "next/server";

import axios from "axios";
import FormData from "form-data";

export async function POST(request: Request) {
  // Get form data from the client
  const formData = await request.formData();

  // Get the file from the form data
  const file = formData.get("file") as Blob;

  // Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Create a new form data
  const form = new FormData();
  form.append("file", buffer, file.name);
  form.append("model", "whisper-1");

  // Call Whisper API to transcribe the audio
  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      form,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return NextResponse.json({ transcription: data.text }, { status: 200 });
  } catch (error: any) {
    console.log(error.response);

    // Return the JSON response {message: "OK"} to the client
    return NextResponse.json({ error: error.response.data.error.message }, { status: 500 });
  }
}
