"use client";
import Dropzone from "react-dropzone";
import ReactPlayer from "react-player";
import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);

  // Callback function to handle file upload
  const handleFileUpload = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    console.log(uploadedFile);
    setFile(uploadedFile);

    const data = new FormData();
    data.append("file", uploadedFile);
    data.append("model", "whisper-1");
    setFormData(data);
  };

  const generateTranscription = async () => {
    try {
      // 1. Make Post request to the Whisper API endpoint
      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          headers: {
            Authorization: `Bearer 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`,
          },
          method: "POST",
          body: formData,
        }
      );

      // 2. Get the text transcribed from the above response
      const result = await response.json();
      const transcription = result.text;
      
      setTranscription(transcription);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="py-10">
        {/* Transcriber Container */}
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Transcribe Audio
          </h1>

          {/* DropZone */}
          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <div
                className="border-4 border-dashed border-gray-400 p-4 rounded-md text-center cursor-pointer"
                {...getRootProps()}
              >
                <input {...getInputProps()} accept="audio/*" />{" "}
                {file ? (
                  <div className="flex items-center justify-center">
                    <ReactPlayer
                      url={URL.createObjectURL(file)}
                      controls
                      width="100%"
                      height="100%"
                      className="react-player"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 text-lg">
                    Drag 'n' drop some files here, or click to select files
                  </p>
                )}
              </div>
            )}
          </Dropzone>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex justify-center">
              <button
                onClick={generateTranscription}
                className="flex items-center justify-center w-32 py-2 rounded bg-black hover:scale-105 hover:duration-300 text-white font-bold"
              >
                Transcribe
              </button>

              <button className="ml-4 bg-gray-300 w-32 py-2 rounded bg-block hover:scale-105 hover:duration-300 text-white font-bold">
                Reset
              </button>
            </div>
          </div>

          {/* Transcription here*/}
          <div className="mt-6">
            <p className="text-md text-black">{transcription}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
