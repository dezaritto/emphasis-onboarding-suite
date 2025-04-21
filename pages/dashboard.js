import { useState, useEffect } from 'react';

const workflows = {
  "Full Planning – No Plan": [
    "FIT Meeting", "Post-FIT Reflection", "Consent Form", "ASTUTE Pull (If Needed)",
    "Discovery Meeting", "FICA + Client Info", "Prepare & Deliver Plan", "Confirm Implementation Preferences"
  ],
  "Full Planning – With Plan": [
    "FIT Meeting", "Post-FIT Reflection", "Consent Form", "Receive Existing Plan",
    "Plan Review", "Discovery Meeting", "Decide to Adopt or Replace", "FICA + Client Info", "Deliver Emphasis Plan"
  ],
  "Limited Planning – With Plan": [
    "FIT Meeting", "Post-FIT Reflection", "Consent Form + Scope", "Submit Existing Plan",
    "Review Plan Briefly", "Request Additional Info", "Deliver Advice", "Optional Check-In"
  ],
  "Limited Planning – No Plan": [
    "FIT Meeting", "Define Scope", "Consent Form + Scope", "Gather Info",
    "Discovery (if needed)", "Deliver Advice", "Invite Future Planning"
  ],
  "Product Advice & Implementation": [
    "FIT/Intro Meeting", "Scope of Advice", "Consent Form + Advice Scope", "Collect Info",
    "Draft Recommendation", "Present Advice", "Implementation", "File & Record Advice"
  ],
  "Product Implementation (Intermediary Only)": [
    "Client Contact", "Define Product Request", "Consent & Execution Agreement", "Collect Documents",
    "Assist with Application", "Submit Forms", "Confirm Setup", "File Record"
  ]
};

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', workflow: '' });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("emphasis_clients");
    if (saved) setClients(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("emphasis_clients", JSON.stringify(clients));
  }, [clients]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addClient = (e) => {
    e.preventDefault();
    if (!form.name || !form.workflow) return;
    const steps = workflows[form.workflow].map(step => ({ step, done: false }));
    setClients([...clients, { ...form, steps }]);
    setForm({ name: '', workflow: '' });
  };

  const toggleStep = (index) => {
    const updated = [...clients];
    const client = updated[selected];
    client.steps[index].done = !client.steps[index].done;
    setClients(updated);
    if (client.steps.every(s => s.done)) {
      updated.splice(selected, 1);
      setClients(updated);
      setSelected(null);
    }
  };

  const exportToCSV = () => {
    const rows = [
      ["Client", "Workflow", "Step", "Completed", "Order"]
    ];
    clients.forEach(client => {
      client.steps.forEach((s, i) => {
        rows.push([
          client.name,
          client.workflow,
          s.step,
          s.done ? "Yes" : "No",
          i + 1
        ]);
      });
    });

    const csvContent = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "emphasis-tracker.csv");
    link.click();
  };

  const nextStepLabel = (client) => {
    const next = client.steps.find(s => !s.done);
    return next ? `Next: ${next.step}` : "Complete";
  };

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Adviser Workflow Tracker</h1>

      <form onSubmit={addClient} className="space-y-4 mb-6">
        <input name="name" placeholder="Client Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="workflow" value={form.workflow} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Workflow</option>
          {Object.keys(workflows).map((wf, i) => (
            <option key={i} value={wf}>{wf}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Client</button>
      </form>

      <button onClick={exportToCSV} className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Export to CSV
      </button>

      {selected === null ? (
        <table className="min-w-full border bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Client</th>
              <th className="border px-4 py-2 text-left">Workflow</th>
              <th className="border px-4 py-2 text-left">Progress</th>
              <th className="border px-4 py-2 text-left">Next Step</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{c.name}</td>
                <td className="border px-4 py-2">{c.workflow}</td>
                <td className="border px-4 py-2">{c.steps.filter(s => s.done).length}/{c.steps.length}</td>
                <td className="border px-4 py-2">{nextStepLabel(c)}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => setSelected(i)} className="text-blue-600 underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">{clients[selected].name} – {clients[selected].workflow}</h2>
          <ul className="space-y-2">
            {clients[selected].steps.map((s, i) => (
              <li key={i} className="flex items-center space-x-3">
                <input type="checkbox" checked={s.done} onChange={() => toggleStep(i)} />
                <span className={s.done ? "line-through text-gray-500" : ""}>{s.step}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => setSelected(null)} className="mt-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>
        </div>
      )}
    </div>
  );
}
