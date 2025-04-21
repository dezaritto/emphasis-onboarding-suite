export default function ProductAdviceWorkflow() {
  const steps = [
    { title: "Step 1: FIT/Intro Meeting", details: "Confirm scope is limited to product-specific advice. Clarify difference from full plan." },
    { title: "Step 2: Scope of Advice", details: "Identify product type (e.g. retirement annuity, TFS, gap cover) and goal." },
    { title: "Step 3: Consent Form + Advice Scope", details: "Send consent form outlining limited engagement." },
    { title: "Step 4: Collect Info", details: "Request only info needed for this product (e.g. income, current cover, dependants)." },
    { title: "Step 5: Draft Recommendation", details: "Prepare tailored recommendation and compare product options." },
    { title: "Step 6: Present Advice", details: "Deliver advice via meeting or summary document." },
    { title: "Step 7: Implementation", details: "Assist with application paperwork or online process." },
    { title: "Step 8: File & Record Advice", details: "Ensure advice record and compliance filing is complete." }
  ];

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Workflow: Product Advice & Implementation</h1>
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
