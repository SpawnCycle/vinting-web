/* Mock */
const mockUser = {
  id: 404,
  name: "Dev User",
  email: "dev@user.hu",
  role: ["Admin"],
  created_at: "2020-01-01",
  modified_at: "2020-01-01",
};
const useBackend = import.meta.env.VITE_USE_BACKEND === "true";

//reg
export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch("/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Signup failed");

  return res.json();
}

//login
export async function login(data: { email: string; password: string }) {
  const body = new URLSearchParams();
  body.append("email", data.email);
  body.append("password", data.password);

  const res = await fetch("/api/users/login", {
    method: "POST",
    credentials: "include",
    body: body,
  });

  if (!res.ok) throw new Error("Login failed");
}

//logout
export async function logout() {
  await fetch("/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
}

//whoami (mock)
export async function whoami() {
  if (!useBackend) return mockUser;

  const res = await fetch("/api/users/whoami", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  return data;
}

//edit profile
export async function editProfile(
  id: number,
  data: {
    id: number;
    name?: string;
    email?: string;
    password?: string;
  },
) {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Profile update failed");

  if (res.status === 204) return null;
  return res.json();
}
