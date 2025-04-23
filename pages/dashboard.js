import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const workflows = {
  "Full Plan – No Plan": [
    "Welcome Call",
    "Send Discovery Pack",
    "Intro Meeting Booked",
    "Risk & Goal Assessment",
    "Initial Plan Drafted",
    "Plan Delivery Meeting",
    "Implementation Starts",
  ],
  "Existing Client Review Process": [
    "Pre-review call/email",
    "Update risk and goals",
    "Book annual review",
    "Deliver review report",
    "Discuss next steps",
    "Update compliance docs",
  ],
};

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [workflow, setWorkflow] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("clients");
    if (saved) {
      setClients(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  const addClient = () => {
    if (!name || !workflow) return;
    const newClient = {
      name,
      workflow,
      progress: [],
      notes: "",
    };
    setClients([...clients, newClient]);
    setName("");
    setWorkflow("");
  };

  const toggleStep = (clientIndex, step) => {
    setClients((prev) =>
      prev.map((client, idx) =>
        idx === clientIndex
          ? {
              ...client,
              progress: client.progress.includes(step)
                ? client.progress.filter((s) => s !== step)
                : [...client.progress, step],
            }
          : client
      )
    );
  };

  const updateNotes = (clientIndex, notes) => {
    setClients((prev) =>
      prev.map((client, idx) =>
        idx === clientIndex ? { ...client, notes } : client
      )
    );
  };

  const exportToExcel = () => {
    const data = clients.map((client) => ({
      Name: client.name,
      Workflow: client.workflow,
      Completed: client.progress.length,
      Total: workflows[client.workflow]?.length || 0,
      Notes: client.notes,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "Adviser_Dashboard.xlsx");
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Adviser Dashboard</h1>
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select
          value={workflow}
          onChange={(e) => setWorkflow(e.target.value)}
          className="border p-2 rounded w-64"
        >
          <option value="">Select Workflow</option>
          {Object.keys(workflows).map((wf) => (
            <option key={wf} value={wf}>
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

      {clients.length === 0 ? (
        <p className="text-gray-500 mt-4">No clients added yet.</p>
      ) : (
        <div className="grid gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md bg-gray-50"
            >
              <h2 className="font-semibold text-lg mb-2">
                {client.name} – {client.workflow}
              </h2>
              <div className="grid gap-2">
                {workflows[client.workflow]?.map((step, idx) => (
                  <label
                    key={idx}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={client.progress.includes(step)}
                      onChange={() => toggleStep(index, step)}
                    />
                    <span
                      className={
                        client.progress.includes(step)
                          ? "line-through text-green-700"
                          : ""
                      }
                    >
                      {step}
                    </span>
                  </label>
                ))}
              </div>
              <textarea
                className="border p-2 mt-4 w-full rounded"
                rows={2}
                placeholder="Notes"
                value={client.notes}
                onChange={(e) => updateNotes(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
