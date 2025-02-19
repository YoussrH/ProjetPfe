"use client";
import { useState } from "react";

export default function ImageSearch() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await fetch("/api/image-search", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("AI Response:", data);
    setResults(data.features || []);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="mt-3 w-40 h-40 object-cover" />}
      <button onClick={handleUpload} className="mt-3 px-5 py-2 bg-blue-600 text-white rounded">
        Find Similar Items
      </button>

      {/* Display AI Results */}
      {results.length > 0 && (
        <div className="mt-5">
          <h3 className="text-lg font-bold">AI Found Similar Features:</h3>
          <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
