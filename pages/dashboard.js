import { useEffect, useState } from "react";
import COMPLIANCE_CHECKLIST from "../utils/compliance-checklist";

export default function AdviserDashboard() {
  const [clients, setClients] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("clientList");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [name, setName] = useState("");
  const [workflow, setWorkflow] = useState("");

  useEffect(() => {
    localStorage.setItem("clientList", JSON.stringify(clients));
  }, [clients]);

  const addClient = () => {
    if (!name || !workflow) return;
    const newClient = {
      id: Date.now(),
      name,
      workflow,
      completedSteps: [],
    };
    setClients([...clients, newClient]);
    setName("");
    setWorkflow("");
  };

  const toggleStep = (id, step) => {
    setClients(prev =>
      prev.map(client =>
        client.id === id
          ? {
              ...client,
              completedSteps: client.completedSteps.includes(step)
                ? client.completedSteps.filter(s => s !== step)
                : [...client.completedSteps, step],
            }
          : client
      )
    );
  };

  const removeClientIfComplete = (id) => {
    const client = clients.find(c => c.id === id);
    const isComplete = COMPLIANCE_CHECKLIST.every(step =>
      client.completedSteps.includes(step)
    );
    if (isComplete) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Adviser Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Client Name"
          className="border p-2 rounded w-1/3"
        />
        <select
          value={workflow}
          onChange={(e) => setWorkflow(e.target.value)}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Select Workflow</option>
          <option value="Full Plan – No Plan">Full Plan – No Plan</option>
          <option value="Existing Client Review Process">
            Existing Client Review Process
          </option>
        </select>
        <button
          onClick={addClient}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Client
        </button>
      </div>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients added yet.</p>
      ) : (
        <div className="space-y-6">
          {clients.map(client => {
            const isComplete = COMPLIANCE_CHECKLIST.every(step =>
              client.completedSteps.includes(step)
            );
            const status = isComplete ? "✅" : "⚠️";

            return (
              <div key={client.id} className="border p-4 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">
                    {client.name} ({client.workflow})
                  </h2>
                  <span className="text-xl">{status}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {COMPLIANCE_CHECKLIST.map((step, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        toggleStep(client.id, step);
                        setTimeout(() => removeClientIfComplete(client.id), 500);
                      }}
                      className={`p-2 border rounded cursor-pointer text-sm ${
                        client.completedSteps.includes(step)
                          ? "bg-green-100 border-green-600"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
