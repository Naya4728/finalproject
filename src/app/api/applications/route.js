let applications = [
  {
    id: 1,
    personal: { firstName: "John", lastName: "Doe", email: "john@example.com" },
    academic: { course: "Computer Science" },
    guardian: { name: "Jane Doe" },
    status: "Pending",
  },
  {
    id: 2,
    personal: { firstName: "Alice", lastName: "Smith", email: "alice@example.com" },
    academic: { course: "Biology" },
    guardian: { name: "Bob Smith" },
    status: "Pending",
  },
  {
    id: 3,
    personal: { firstName: "Michael", lastName: "Brown", email: "michael@example.com" },
    academic: { course: "Engineering" },
    guardian: { name: "Sarah Brown" },
    status: "Approved",
  },
  {
    id: 4,
    personal: { firstName: "David", lastName: "Johnson", email: "david@example.com" },
    academic: { course: "Mathematics" },
    guardian: { name: "Mary Johnson" },
    status: "Rejected",
  },
  {
    id: 5,
    personal: { firstName: "Sophia", lastName: "Williams", email: "sophia@example.com" },
    academic: { course: "Business Administration" },
    guardian: { name: "James Williams" },
    status: "Pending",
  },
  {
    id: 6,
    personal: { firstName: "Daniel", lastName: "Taylor", email: "daniel@example.com" },
    academic: { course: "Economics" },
    guardian: { name: "Patricia Taylor" },
    status: "Pending",
  },
];

// GET all applications
export async function GET() {
  return Response.json(applications);
}

// POST new application
export async function POST(req) {
  const body = await req.json();

  const newApplication = {
    id: applications.length + 1,
    ...body,
    status: "Pending",
  };

  applications.push(newApplication);

  return Response.json(newApplication, { status: 201 });
}

// UPDATE application status
export async function PATCH(req) {
  const { id, status } = await req.json();

  const index = applications.findIndex((app) => app.id === id);

  if (index === -1) {
    return new Response("Application not found", { status: 404 });
  }

  applications[index].status = status;

  return Response.json(applications[index]);
}