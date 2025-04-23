import { useState } from "react";

const steps = [
  "Initial Contact and Identify Planning Need",
  "Schedule FIT Meeting",
  "Conduct FIT Meeting – Assess scope for limited advice",
  "Consent form sent and returned",
  "Review Existing Financial Plan",
  "Define Specific Objective or Advice Area",
  "Collect Supporting Info (FICA, etc.)",
  "Prepare Limited Scope Recommendations",
  "Present and Agree Plan",
  "Implementation (if applicable)"
];

export default function LimitedWithPlanWorkflow() {
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
      <h1 className="text-2xl font-bold mb-6">New Client Workflow – Limited Planning (With Existing Plan)</h1>
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
