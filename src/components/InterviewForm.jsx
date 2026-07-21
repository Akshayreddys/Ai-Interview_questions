import React, { useState } from "react";
import generateQuestions from "../services/AiService";

function InterviewForm({ setQuestions }) {
  const [technology, setTechnology] = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setError("");
    setLoading(true);

    try {
      if (!technology.trim()) {
        throw new Error("Please enter a technology");
      }

      const result = await generateQuestions(technology, experience);
      
      if (!result) {
        throw new Error("No response from API");
      }

      const parsedQuestions = JSON.parse(result);
      
      if (!Array.isArray(parsedQuestions)) {
        throw new Error("API response is not an array");
      }

      if (parsedQuestions.length === 0) {
        throw new Error("No questions generated");
      }

      setQuestions(parsedQuestions);
      setError("");
    } catch (err) {
      const errorMessage = err.message || "Failed to generate questions. Please try again.";
      setError(errorMessage);
      console.error("Error in handleGenerate:", err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-3 items-center">
      <div className="flex flex-col gap-3 justify-center w-full sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Enter Technology (e.g., React, Python, Java)"
          className="border p-2 rounded w-full sm:w-auto"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          disabled={loading}
        />
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
          disabled={loading}
        >
          <option>Fresher</option>
          <option>1-3 Years</option>
          <option>3-5 Years</option>
          <option>5+ Years</option>
        </select>
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>
      {error && (
        <div className="text-red-600 bg-red-100 p-3 rounded max-w-3xl">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default InterviewForm;
