export default function FullWithPlanWorkflow() {
  const steps = [
    { title: "Step 1: FIT Meeting", details: "Discuss current plan and intentions. Use ProfileMe to build rapport. Assess if Emphasis is a better fit." },
    { title: "Step 2: Post-FIT Reflection", details: "Both parties reflect before deciding to proceed." },
    { title: "Step 3: Consent Form", details: "Send Client Consent Form securely. Wait for signature before reviewing documents." },
    { title: "Step 4: Receive Existing Plan", details: "Client submits their current plan for assessment." },
    { title: "Step 5: Plan Review", details: "Adviser reviews assumptions, gaps, and relevance. Log as replacement advice if applicable." },
    { title: "Step 6: Discovery Meeting", details: "Understand updated needs, values, and gaps not covered by current plan." },
    { title: "Step 7: Decide to Adopt or Replace", details: "Either adopt with minor updates or prepare a new Emphasis plan." },
    { title: "Step 8: FICA + Client Info", details: "Admin collects after consent and decision to proceed." },
    { title: "Step 9: Deliver Emphasis Plan", details: "Present updated or new plan. Transition to implementation phase." }
  ];

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Workflow: Full Planning (With Existing Plan)</h1>
      <ol className="space-y-4 list-decimal list-inside">
        {steps.map((step, i) => (
          <li key={i} className="bg-gray-50 p-4 rounded-xl border">
            <h2 className="font-semibold">{step.title}</h2>
            <p className="text-sm mt-1">{step.details}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
