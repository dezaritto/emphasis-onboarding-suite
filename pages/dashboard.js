import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const workflows = {
  "Full Plan – No Plan": [
    "Initial Contact and Schedule FIT Meeting",
    "Conduct FIT Meeting",
    "Consent Form Signed",
    "ASTUTE FSE Pulled",
    "Discovery Meeting Scheduled",
    "Collect FICA & Client Info",
    "Plan Preparation",
    "Plan Presentation",
    "Implementation Confirmed",
    "Implementation Initiated"
  ],
  "Existing Client Review Process": [
    "Review Due Notification",
    "Pre-Review Prep Email Sent",
    "Client Completes Info Update Form",
    "ASTUTE Report Pulled",
    "Review Meeting Conducted",
    "Meeting Notes & Adjustments",
    "Recommendations Presented",
    "Implementation Initiated",
    "CRM & Docs Updated",
    "Confirmation Sent"
  ]
};

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: "", workflow: "" });
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("clientTracker");
    if (saved) setClients(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("clientTracker", JSON.stringify(clients));
  }, [clients]);

  const addClient = () => {
    const steps = workflows[newClient.workflow].map(label => ({ label, completed: false, notes: "" }));
    setClients([...clients, { ...newClient, steps, currentStep: 0 }]);
    setNewClient({ name: "", workflow: "" });
  };

  const updateStep = (stepIndex) => {
    const updated = [...clients];
    const client = updated[selectedIndex];
    client.steps[stepIndex].completed = !client.steps[stepIndex].completed;
    client.currentStep = stepIndex;
    setClients(updated);
  };

  const updateNote = (stepIndex, note) => {
    const updated = [...clients];
    updated[selectedIndex].steps[stepIndex].notes = note;
    setClients(updated);
  };

  const exportToExcel = () => {
    const data = clients.map(c => ({
      Name: c.name,
      Workflow: c.workflow,
      "Progress": `${c.steps.filter(s => s.completed).length}/${c.steps.length}`
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clients");
    XLSX.writeFile(wb, "ClientWorkflowTracker.xlsx");
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Adviser Dashboard</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Client Name"
          value={newClient.name}
          onChange={e => setNewClient({ ...newClient, name: e.target.value })}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={newClient.workflow}
          onChange={e => setNewClient({ ...newClient, workflow: e.target.value })}
          className="border p-2 rounded w-1/3"
        >
          <option value="">Select Workflow</option>
          {Object.keys(workflows).map(w => (
            <option key={w}>{w}</option>
          ))}
        </select>
        <button onClick={addClient} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Client
        </button>
        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded">
          Export to Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clients.map((client, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="border rounded p-4 shadow cursor-pointer hover:bg-gray-50"
          >
            <h2 className="font-semibold text-lg">{client.name}</h2>
            <p className="text-sm text-gray-600">{client.workflow}</p>
            <p className="text-sm mt-2">\              Progress: {client.steps.filter(s => s.completed).length}/{client.steps.length}
            </p>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">\            Workflow for {clients[selectedIndex].name}
          </h2>
          <div className="space-y-4">
            {clients[selectedIndex].steps.map((step, i) => (
              <div key={i} className="border p-4 rounded">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{step.label}</span>
                  <input
                    type="checkbox"
                    checked={step.completed}
                    onChange={() => updateStep(i)}
                  />
                </div>
                <textarea
                  placeholder="Add notes..."
                  value={step.notes}
                  onChange={e => updateNote(i, e.target.value)}
                  className="w-full mt-2 border p-2 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
