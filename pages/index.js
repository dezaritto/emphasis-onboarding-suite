export default function MetaSelector() {
  const groups = [
    {
      title: "New Clients",
      routes: [
        { label: "Full Plan – No Plan", path: "/workflow/full-no-plan" },
        { label: "Full Plan – With Plan", path: "/workflow/full-with-plan" },
        { label: "Limited Plan – With Plan", path: "/workflow/limited-with-plan" },
        { label: "Limited Plan – No Plan", path: "/workflow/limited-no-plan" },
        { label: "Product Advice & Implementation", path: "/workflow/product-advice" },
        { label: "Product Implementation (Intermediary Only)", path: "/workflow/intermediary-only" },
      ]
    },
    {
      title: "Existing Clients",
      routes: [
        { label: "Intermediary to Planning Introduction", path: "/workflow/existing-intro" },
        { label: "Existing Client Review Process", path: "/workflow/existing-review" }
      ]
    },
    {
      title: "Tools",
      routes: [
        { label: "Adviser Dashboard", path: "/dashboard" },
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Start Here: Workflow Selector</h1>
      {groups.map((group, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-lg font-semibold mb-4">{group.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.routes.map((route, j) => (
              <a
                key={j}
                href={route.path}
                className="block border border-blue-600 rounded-lg p-4 hover:bg-blue-50"
              >
                {route.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
