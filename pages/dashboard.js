import { useEffect, useState } from "react";
import { complianceChecklist } from "../utils/compliance-checklist";
import * as XLSX from "xlsx";

export default function AdviserDashboard() {
  const [clientName, setClientName] = useState("");
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("dashboardClients");
    if (stored) {
      setClients(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardClients", JSON.stringify(clients));
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
    const updatedClients = [...clients];
    const progress = updatedClients[clientIndex].progress;
    if (progress.includes(step)) {
      updatedClients[clientIndex].progress = progress.filter(s => s !== step);
    } else {
      updatedClients[clientIndex].progress = [...progress, step];
    }
    setClients(updatedClients);
  };

  const exportToExcel = () => {
    const data = clients.map(client => ({
      Name: client.name,
      Workflow: client.workflow,
      Completed: client.progress.join(", ")
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "client-compliance-tracker.xlsx");
  };

  const removeClient = (index) => {
    const updatedClients = [...clients];
    updatedClients.splice(index, 1);
    setClients(updatedClients);
  };

  const isCompliant = (workflow, progress) => {
    const requiredSteps = complianceChecklist[workflow] || [];
    return requiredSteps.every(step => progress.includes(step));
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Adviser Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Client Name"
          className="border p-2 rounded w-64"
        />
        <select
          value={selectedWorkflow}
          onChange={(e) => setSelectedWorkflow(e.target.value)}
          className="border p-2 rounded w-64"
        >
          <option value="">Select Workflow</option>
          {Object.keys(complianceChecklist).map((workflow) => (
            <option key={workflow} value={workflow}>{workflow}</option>
          ))}
        </select>
        <button
          onClick={addClient}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Client
        </button>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export to Excel
        </button>
      </div>

      {clients.length === 0 && (
        <p className="text-gray-500">No clients added yet.</p>
      )}

      {clients.map((client, index) => (
        <div
          key={index}
          className="mb-6 border border-gray-300 rounded p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">
              {client.name} – {client.workflow}
            </h2>
            <span className={
              isCompliant(client.workflow, client.progress)
                ? "text-green-600"
                : "text-yellow-600"
            }>
              {isCompliant(client.workflow, client.progress) ? "✅ Compliant" : "⚠️ Incomplete"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {(complianceChecklist[client.workflow] || []).map((step, stepIndex) => (
              <div
                key={stepIndex}
                onClick={() => toggleStep(index, step)}
                className={`cursor-pointer px-3 py-2 rounded border text-sm ${
                  client.progress.includes(step)
                    ? "bg-green-100 border-green-500"
                    : "hover:bg-gray-100 border-gray-300"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          {isCompliant(client.workflow, client.progress) && (
            <button
              onClick={() => removeClient(index)}
              className="mt-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove Client
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
