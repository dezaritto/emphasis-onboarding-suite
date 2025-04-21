export default function LimitedNoPlanWorkflow() {
  const steps = [
    { title: "Step 1: FIT Meeting", details: "Confirm client only wants limited advice. Use ProfileMe to explain difference from full planning." },
    { title: "Step 2: Define Scope", details: "Identify advice area (e.g. retirement, tax, product). Reinforce limited nature of the engagement." },
    { title: "Step 3: Consent Form + Scope", details: "Send consent form with advice scope brief. POPIA-compliant." },
    { title: "Step 4: Gather Info", details: "Collect only the minimum data required to provide advice." },
    { title: "Step 5: Discovery (if needed)", details: "Optional extra meeting to clarify goals or risk tolerance." },
    { title: "Step 6: Deliver Advice", details: "Provide narrow-scope advice in writing or via a short meeting." },
    { title: "Step 7: Invite Future Planning", details: "Offer to revisit for full plan in future if client prefers." }
  ];

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Workflow: Limited Planning (No Existing Plan)</h1>
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
