import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { complianceChecklist } from "../utils/compliance-checklist";

const workflowSteps = {
  "Full Plan – No Plan": [
    "Initial Contact",
    "FIT Meeting Held",
    "Discovery Session Completed",
    "Signed Full Planning Service Agreement",
    "Plan Prepared",
    "Plan Presented",
    "Implementation Begins"
  ],
  "Product Implementation (Intermediary Only)": [
    "Intermediary Contact Initiated",
    "FICA Verification",
    "Signed Intermediary Services Agreement",
    "Service Request Submitted",
    "Provider Update Confirmed"
  ]
};

export default function AdviserDashboard() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [workflow, setWorkflow] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("advisorClientData");
    if (saved) setClients(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("advisorClientData", JSON.stringify(clients));
  }, [clients]);

  const addClient = () => {
    if (!name || !workflow) return;
    const steps = workflowSteps[workflow] || [];
    const compliance = complianceChecklist[workflow] || [];
    setClients([
      ...clients,
      {
        name,
        workflow,
        progress: [],
        complianceProgress: [],
        steps,
        compliance
      }
    ]);
    setName("");
    setWorkflow("");
  };

  const toggleProgress = (index, step, type = "progress") => {
    setClients((prev) => {
      const updated = [...prev];
      const client = updated[index];
      const current = client[type];
      client[type] = current.includes(step)
        ? current.filter((s) => s !== step)
        : [...current, step];

      // Remove client if workflow and compliance are completed
      if (
        client.progress.length === client.steps.length &&
        client.complianceProgress.length === client.compliance.length
      ) {
        updated.splice(index, 1);
      }

      return updated;
    });
  };

  const isCompliant = (client) =>
    client.compliance.length > 0 &&
    client.compliance.every((step) => client.complianceProgress.includes(step));

  const exportToExcel = () => {
    const data = clients.map((client) => ({
      Name: client.name,
      Workflow: client.workflow,
      "Progress": `${client.progress.length}/${client.steps.length}`,
      "Compliance Status": isCompliant(client) ? "Compliant" : "⚠️ Incomplete"
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard");
    XLSX.writeFile(workbook, "Dashboard_Export.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Adviser Dashboard</h1>

      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Client Name"
          className="border p-2 rounded w-64"
        />
        <select
          value={workflow}
          onChange={(e) => setWorkflow(e.target.value)}
          className="border p-2 rounded w-64"
        >
          <option value="">Select Workflow</option>
          {Object.keys(workflowSteps).map((w) => (
            <option key={w}>{w}</option>
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

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Client</th>
            <th className="border-b p-2">Workflow</th>
            <th className="border-b p-2">Progress</th>
            <th className="border-b p-2">Compliance</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 font-medium">{client.name}</td>
              <td className="p-2">{client.workflow}</td>
              <td className="p-2">
                {client.steps.map((s, i) => (
                  <label key={i} className="block">
                    <input
                      type="checkbox"
                      checked={client.progress.includes(s)}
                      onChange={() => toggleProgress(index, s, "progress")}
                      className="mr-2"
                    />
                    {s}
                  </label>
                ))}
              </td>
              <td className="p-2">
                {client.compliance.map((c, i) => (
                  <label key={i} className="block">
                    <input
                      type="checkbox"
                      checked={client.complianceProgress.includes(c)}
                      onChange={() => toggleProgress(index, c, "complianceProgress")}
                      className="mr-2"
                    />
                    {c}
                  </label>
                ))}
              </td>
              <td className="p-2 text-xl">
                {isCompliant(client) ? "✅" : "⚠️"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
