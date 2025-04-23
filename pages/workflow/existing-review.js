import { useState } from "react";

const steps = [
  "Review Due Notification",
  "Pre-Review Prep Email Sent",
  "Client Completes Info Update Form",
  "ASTUTE Report Pulled (if applicable)",
  "Review Meeting Conducted",
  "Meeting Notes & Plan Adjustments Drafted",
  "Recommendations Presented (if applicable)",
  "Implementation Initiated (if agreed)",
  "CRM & Document Records Updated",
  "Confirmation Sent & Review Flag Reset"
];

export default function ExistingClientReviewWorkflow() {
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
      <h1 className="text-2xl font-bold mb-6">Existing Client Workflow – Review Process</h1>
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
