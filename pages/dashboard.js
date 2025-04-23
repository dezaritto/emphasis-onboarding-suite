import { useState } from "react";
import * as XLSX from "xlsx";

const workflowSteps = {
  "Full Plan – No Plan": [
    "Initial Call",
    "Service Agreement Sent",
    "Service Agreement Signed",
    "Risk Profiling Complete",
    "Discovery Meeting Held",
    "Plan Drafted",
    "Plan Presented",
    "Implementation Started"
  ],
  "Full Plan – With Plan": [
    "Initial Meeting",
    "Review Existing Plan",
    "Identify Gaps",
    "Draft Supplement",
    "Plan Updated",
    "Client Approval",
    "Implementation Started"
  ],
  "Limited Plan – With Plan": [
    "Client Request Logged",
    "Scope Defined",
    "Plan Review",
    "Recommendation Letter Sent",
    "Implementation Confirmed"
  ],
  "Limited Plan – No Plan": [
    "Initial Contact",
    "Briefing Held",
    "Key Priorities Identified",
    "Recommendation Drafted",
    "Delivered to Client",
    "Implementation Optional"
  ],
  "Product Advice & Implementation": [
    "Product Needs Identified",
    "Quote Sent",
    "Client Approval",
    "Application Submitted",
    "Policy In Force"
  ],
  "Product Implementation (Intermediary Only)": [
    "Intermediary Service Logged",
    "Forms Sent",
    "Docs Received",
    "Provider Updated",
    "Client Notified"
  ],
  "Intermediary to Planning Introduction": [
    "Initial Intermediary Contact",
    "Confirm Client Record Exists",
    "Verify Identity (FICA Update if needed)",
    "Explain Value of Financial Planning",
    "Send Discovery Questionnaire",
    "Book Intro Planning Meeting",
    "Deliver Asset Map Samples & Service Menu",
    "Update CRM with Interest Level"
  ],
  "Existing Client Review Process": [
    "Schedule Annual Review",
    "Update Risk Profile",
    "Assess Plan Progress",
    "Update Recommendations",
    "Review Fees/Service",
    "Client Confirms Continuation"
  ]
};

export default function AdviserDashboard() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [workflow, setWorkflow] = useState("");

  const addClient = () => {
    if (!name || !workflow) return;
    setClients([
      ...clients,
      { name, workflow, steps: [], notes: Array(workflowSteps[workflow].length).fill("") }
    ]);
    setName("");
    setWorkflow("");
  };

  const toggleStep = (clientIndex, stepIndex) => {
    const updatedClients = [...clients];
    const client = updatedClients[clientIndex];
    const steps = client.steps.includes(stepIndex)
      ? client.steps.filter((i) => i !== stepIndex)
      : [...client.steps, stepIndex];
    client.steps = steps;
    setClients(updatedClients);
  };

  const updateNote = (clientIndex, stepIndex, note) => {
    const updatedClients = [...clients];
    updatedClients[clientIndex].notes[stepIndex] = note;
    setClients(updatedClients);
  };

  const exportToExcel = () => {
    const data = clients.flatMap((client) =>
      workflowSteps[client.workflow].map((step, idx) => ({
        Name: client.name,
        Workflow: client.workflow,
        Step: step,
        Completed: client.steps.includes(idx) ? "Yes" : "No",
        Notes: client.notes[idx]
      }))
    );
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "AdviserDashboard.xlsx");
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Adviser Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <input
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
          {Object.keys(workflowSteps).map((wf, idx) => (
            <option key={idx} value={wf}>
              {wf}
            </option>
          ))}
        </select>
        <button onClick={addClient} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Client
        </button>
        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded">
          Export to Excel
        </button>
      </div>
      {clients.length === 0 ? (
        <p className="text-gray-500">No clients added yet.</p>
      ) : (
        clients.map((client, i) => (
          <div key={i} className="mb-6 border-b pb-4">
            <h2 className="font-semibold text-lg mb-2">{client.name} – {client.workflow}</h2>
            <ul className="space-y-2">
              {workflowSteps[client.workflow].map((step, j) => (
                <li
                  key={j}
                  onClick={() => toggleStep(i, j)}
                  className={`cursor-pointer border p-2 rounded ${
                    client.steps.includes(j) ? "bg-green-100 border-green-600" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{step}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Add note..."
                    value={client.notes[j]}
                    onChange={(e) => updateNote(i, j, e.target.value)}
                    className="mt-1 w-full p-1 border rounded"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
