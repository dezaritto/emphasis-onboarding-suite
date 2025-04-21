export default function FullNoPlanWorkflow() {
  const steps = [
    { title: "Step 1: FIT Meeting", details: "Conduct 40-min intro session using ProfileMe. Cover values, goals, expectations and outline the financial planning journey." },
    { title: "Step 2: Post-FIT Reflection", details: "Both adviser and client reflect and confirm readiness to move forward." },
    { title: "Step 3: Consent Form", details: "Send Client Consent Form via secure platform. Wait for signed form before collecting any documents or data." },
    { title: "Step 4: ASTUTE Pull (If Needed)", details: "Use ASTUTE FSE to pull policy info after consent is signed and received." },
    { title: "Step 5: Discovery Meeting", details: "Deep dive into goals, income, assets. Use 'What’s Important to You', risk profile, and lifestyle tools." },
    { title: "Step 6: FICA + Client Info", details: "Admin collects FICA documents securely after discovery and consent." },
    { title: "Step 7: Prepare & Deliver Plan", details: "Create tailored financial plan and present to client for decision-making." },
    { title: "Step 8: Confirm Implementation Preferences", details: "Agree on implementation actions. Transition to onboarding next phase." }
  ];

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Workflow: Full Planning (No Existing Plan)</h1>
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
