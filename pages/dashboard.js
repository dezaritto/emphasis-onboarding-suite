import { useState } from 'react';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', workflow: '', status: '' });

  const workflows = [
    "Full Planning – No Plan",
    "Full Planning – With Plan",
    "Limited Planning – With Plan",
    "Limited Planning – No Plan",
    "Product Advice & Implementation",
    "Product Implementation (Intermediary Only)"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.workflow || !form.status) return;
    setEntries([...entries, form]);
    setForm({ name: '', workflow: '', status: '' });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Adviser Workflow Tracker</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="name"
          placeholder="Client Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="workflow"
          value={form.workflow}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Workflow</option>
          {workflows.map((wf, i) => (
            <option key={i} value={wf}>{wf}</option>
          ))}
        </select>
        <input
          name="status"
          placeholder="Status or Notes"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Entry
        </button>
      </form>

      <div className="overflow-auto">
        <table className="min-w-full border bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Client</th>
              <th className="border px-4 py-2 text-left">Workflow</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{entry.name}</td>
                <td className="border px-4 py-2">{entry.workflow}</td>
                <td className="border px-4 py-2">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
