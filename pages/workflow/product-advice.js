import { useState } from "react";

const steps = [
  "Initial Contact – Client expresses need for product",
  "Assess Client Understanding and Goals",
  "Clarify Scope: Advice vs Implementation",
  "Consent Form Signed",
  "Gather Personal & Financial Information",
  "Analyse Need & Evaluate Product Suitability",
  "Compare Product Options & Providers",
  "Present Product Recommendation",
  "Obtain Acceptance & Complete Application Forms",
  "Implementation Follow-up & Policy Confirmation"
];

export default function ProductAdviceWorkflow() {
  const [completedSteps, setCompletedSteps] = useState([]);

  const toggleStep = (step) => {
    setCompletedSteps((prev) =>
      prev.includes(step)
        ? prev.filter((s) => s !== step)
        : [...prev, step]
    );
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">New Client Workflow – Product Advice & Implementation</h1>
      <div className="grid gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={() => toggleStep(step)}
            className={`p-4 border rounded-lg cursor-pointer ${
              completedSteps.includes(step)
                ? "bg-green-100 border-green-600"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Click on steps to mark as complete. Progress is currently session-based only.
      </p>
    </div>
  );
}
