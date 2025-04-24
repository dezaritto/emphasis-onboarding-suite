import { useEffect, useState } from "react";
import { complianceChecklist } from "../utils/compliance-checklist";
import * as XLSX from "xlsx";

export default function AdviserDashboard() {
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [selectedWorkflow, setSelectedWorkflow] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("clientList");
    if (stored) {
      setClients(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clientList", JSON.stringify(clients));
  }, [clients]);

  const addClient = () => {
    if (!clientName || !selectedWorkflow) return;
    const newClient = {
      name: clientName,
      workflow: selectedWorkflow,
      progress: [],
    };
    setClients([...clients, newClient]);
    setClientName("");
    setSelectedWorkflow("");
  };

  const toggleStep = (clientIndex, step) => {
    setClients((prev) => {
      const updated = [...prev];
      const progress = updated[clientIndex].progress;
      updated[clientIndex].progress = progress.includes(step)
        ? progress.filter((s) => s !== step)
        : [...progress, step];
      return updated;
    });
  };

  const exportToExcel = () => {
    const data = clients.map((client) => {
      const required = complianceChecklist[client.workflow] || [];
      return {
        "Client Name": client.name,
        Workflow: client.workflow,
        ...required.reduce((acc, step) => {
          acc[step] = client.progress.includes(step) ? "✓" : "✗";
          return acc;
        }, {}),
      };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Compliance");
    XLSX.writeFile(wb, "adviser-compliance-summary.xlsx");
  };

  const removeClient = (index) => {
    setClients((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Adviser Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Client Name"
          className="p-2 border rounded w-1/3"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <select
          className="p-2 border rounded w-1/3"
          value={selectedWorkflow}
          onChange={(e) => setSelectedWorkflow(e.target.value)}
        >
          <option value="">Select Workflow</option>
          {Object.keys(complianceChecklist).map((workflow) => (
            <option key={workflow} value={workflow}>
              {workflow}
            </option>
          ))}
        </select>
        <button
          onClick={addClient}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add Client
        </button>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 rounded"
        >
          Export to Excel
        </button>
      </div>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients added yet.</p>
      ) : (
        clients.map((client, index) => {
          const checklist = complianceChecklist[client.workflow] || [];
          const completed = checklist.filter((step) => client.progress.includes(step));
          const isComplete = completed.length === checklist.length;
          return (
            <div
              key={index}
              className="mb-6 p-4 border rounded shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                  {client.name} ({client.workflow}) {isComplete ? "✅" : "⚠️"}
                </h2>
                <button
                  onClick={() => removeClient(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {checklist.map((step, i) => (
                  <div
                    key={i}
                    onClick={() => toggleStep(index, step)}
                    className={`p-2 border rounded text-sm cursor-pointer ${
                      client.progress.includes(step)
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
        })
      )}
    </div>
  );
}
