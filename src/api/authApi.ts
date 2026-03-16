/* Login & Reg apik */
const mockUser = {
  id: 1,
  name: "Test User",
  email: "test@user.hu",
  created_at: "2020-01-01",
  modified_at: "2020-01-01",
};

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
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
}

//logout
export async function logout() {
  console.log("logout");
  await fetch("/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
}

//whoami (mock)
export async function whoami() {
  const res = await fetch("/api/users/whoami", {
    method: "POST",
    credentials: "include",
  });
  console.log("whoami: ", res.json());
  return res.json();
}
