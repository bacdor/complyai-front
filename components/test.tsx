import React, { useState } from "react";

interface BuildingAnalysisRequest {
  pdf_file: string;
  address: string;
}

interface RequirementResult {
  requirement: string;
  status: string;
  reason: string;
}

interface BuildingAnalysisResponse {
  requirements: RequirementResult[];
}

const BuildingAnalysis: React.FC = () => {
  const [address, setAddress] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [results, setResults] = useState<RequirementResult[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const requestData: BuildingAnalysisRequest = {
      pdf_file: pdfFile,
      address: address,
    };

    try {
      const response = await fetch("http://localhost:8000/analyze-building", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BuildingAnalysisResponse = await response.json();
      setResults(data.requirements);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Building Analysis</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-2">PDF File (base64 or URL):</label>
          <input
            type="text"
            value={pdfFile}
            onChange={(e) => setPdfFile(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Analyzing..." : "Analyze Building"}
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">Error: {error}</div>}

      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl mb-2">Results:</h2>
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="border p-4">
                <div>
                  <strong>Requirement:</strong> {result.requirement}
                </div>
                <div>
                  <strong>Status:</strong> {result.status}
                </div>
                <div>
                  <strong>Reason:</strong> {result.reason}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuildingAnalysis;
