"use client"

import Dropzone from "react-dropzone";

export default function HomePage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="py-10">
        {/* Transcriber Container */}
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Transcribe Audio
          </h1>

          {/* DropZone */}
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div className="border-4 border-dashed border-gray-400 p-4 rounded-md text-center cursor-pointer"
                {...getRootProps()}>
                <input {...getInputProps()} accept="audio/*" /> {/* This is required for Dropzone to work */}
                <p className="text-gray-500 text-lg">
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
            )}
          </Dropzone>


          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex justify-center">
              <button className="flex items-center justify-center w-32 py-2 rounded bg-black hover:scale-105 hover:duration-300 text-white font-bold">
                Transcribe
              </button>

              <button className="ml-4 bg-gray-300 w-32 py-2 rounded bg-block hover:scale-105 hover:duration-300 text-white font-bold">
                Reset
              </button>
            </div>
          </div>

          {/* Transcription here*/}
          <div className="mt-6">
            <p className="text-md text-black">Transcription will be here...</p>
          </div>
        </div>
      </div>
    </main>
  );
}
