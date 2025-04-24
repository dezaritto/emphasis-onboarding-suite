import { useEffect, useState } from "react";
import { complianceChecklist } from "../utils/compliance-checklist";
import * as XLSX from "xlsx";

export default function AdviserDashboard() {
  const [clientName, setClientName] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("adviserClients");
    if (saved) {
      setClients(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adviserClients", JSON.stringify(clients));
  }, [clients]);

  const addClient = () => {
    if (clientName && workflow) {
      setClients([
        ...clients,
        {
          name: clientName,
          workflow,
          progress: {},
        },
      ]);
      setClientName("");
      setWorkflow("");
    }
  };

  const toggleStep = (clientIndex, step) => {
    setClients((prev) => {
      const updated = [...prev];
      const client = updated[clientIndex];
      client.progress[step] = !client.progress[step];
      return updated;
    });
  };

  const exportToExcel = () => {
    const data = clients.map(({ name, workflow, progress }) => {
      const checklist = complianceChecklist?.[workflow] || [];
      const completed = checklist.filter((step) => progress?.[step]);
      return {
        "Client Name": name,
        Workflow: workflow,
        "Completed Steps": completed.length,
        "Total Steps": checklist.length,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "adviser_dashboard_export.xlsx");
  };

  const removeClient = (index) => {
    setClients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Adviser Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Client Name"
          className="border rounded p-2 flex-1"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={workflow}
          onChange={(e) => setWorkflow(e.target.value)}
        >
          <option value="">Select Workflow</option>
          {Object.keys(complianceChecklist).map((wf, i) => (
            <option key={i} value={wf}>
              {wf}
            </option>
          ))}
        </select>
        <button
          onClick={addClient}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Client
        </button>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export to Excel
        </button>
      </div>

      <div className="space-y-6">
        {clients.map((client, index) => {
          const checklist = complianceChecklist?.[client.workflow] || [];
          const completedCount = checklist.filter(
            (step) => client.progress?.[step]
          ).length;
          const isComplete = completedCount === checklist.length;

          return (
            <div
              key={index}
              className="border p-4 rounded shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="font-semibold">{client.name}</h2>
                  <p className="text-sm text-gray-600">
                    {client.workflow} – {completedCount}/{checklist.length} steps completed
                  </p>
                </div>
                <span
                  className={`text-lg font-bold ml-2 ${
                    isComplete ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {isComplete ? "✅" : "⚠️"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {checklist.map((step, i) => (
                  <div
                    key={i}
                    onClick={() => toggleStep(index, step)}
                    className={`p-2 border rounded cursor-pointer ${
                      client.progress?.[step]
                        ? "bg-green-100 border-green-600"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              {isComplete && (
                <div className="mt-4 text-right">
                  <button
                    onClick={() => removeClient(index)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove client
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
