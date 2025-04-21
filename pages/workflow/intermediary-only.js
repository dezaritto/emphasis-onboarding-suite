export default function IntermediaryOnlyWorkflow() {
  const steps = [
    { title: "Step 1: Client Contact", details: "Confirm execution-only (no advice) request. Explain intermediary role clearly." },
    { title: "Step 2: Define Product Request", details: "Identify specific product (e.g. tax-free investment, RA, preservation fund)." },
    { title: "Step 3: Consent & Execution Agreement", details: "Send intermediary-only terms and POPIA/FAIS acknowledgements." },
    { title: "Step 4: Collect Documents", details: "Gather ID, proof of address, bank account details, and any necessary KYC info." },
    { title: "Step 5: Assist with Application", details: "Help client fill provider forms (no product advice). Clarify execution-only." },
    { title: "Step 6: Submit Forms", details: "Send signed documents to the product provider. Track submission." },
    { title: "Step 7: Confirm Setup", details: "Notify client when account is live. Provide supporting documentation." },
    { title: "Step 8: File Record", details: "Log interaction, upload documents, and confirm non-advice disclosure." }
  ];

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Workflow: Product Implementation (Intermediary Only)</h1>
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
