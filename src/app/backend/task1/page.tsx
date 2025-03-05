"use client";

import { useState } from "react";

export default function BackendPage() {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = async () => {
    if (!inputValue.trim()) return;

    const number = parseFloat(inputValue);
    if (isNaN(number) || number % 0.25 !== 0) {
      setOutput("ค่าที่ป้อนต้องเป็นตัวเลขที่เพิ่มขึ้นหรือลดลงทีละ 0.25");
      return;
    }

    const res = await fetch(`/api/setStringHdp?number=${number}`);
    const data = await res.json();

    if (data.error) {
      setOutput("Error: Invalid input");
    } else {
      setOutput(`Result: ${data.output}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
        <h1 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-2 mb-4">
          Backend - Convert Number
        </h1>

        <input
          type="number"
          step="0.25"
          placeholder="Enter a number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-900"
        />

        <button
          onClick={handleConvert}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Convert
        </button>

        <p className="mt-4 text-gray-700">{output}</p>
      </div>
    </div>
  );
}
