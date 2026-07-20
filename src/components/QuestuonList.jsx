import React from "react";
function QuestionsList({ questions }) {
  return (
    <div className="mt-8 max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Generated Questions</h2>
      <ul className="list-disc pl-5">
        {!questions || questions.length === 0 ? (
          <li>No questions generated yet.</li>
        ) : (
          questions.map((question, index) => (
            <li key={index} className="mb-2">
              {question}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
export default QuestionsList;
