export default function LimitedWithPlanWorkflow() {
  const steps = [
    { title: "Step 1: FIT Meeting", details: "Clarify client is seeking limited advice. Use ProfileMe and 'What’s Important to You' for light discovery." },
    { title: "Step 2: Post-FIT Reflection", details: "Agree whether to proceed with limited scope only." },
    { title: "Step 3: Consent Form + Scope", details: "Send limited advice consent form and define the boundaries of the engagement." },
    { title: "Step 4: Submit Existing Plan", details: "Client shares their current plan for context." },
    { title: "Step 5: Review Plan Briefly", details: "Only assess parts related to their query. Avoid holistic review." },
    { title: "Step 6: Request Additional Info", details: "Ask for specific documents (e.g. cover, income, tax) if needed." },
    { title: "Step 7: Deliver Advice", details: "Provide focused advice without encroaching into full planning." },
    { title: "Step 8: Optional Check-In", details: "Invite the client to revisit broader planning later." }
  ];

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Workflow: Limited Planning (With Existing Plan)</h1>
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
