const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getProjects(token) {
  const res = await fetch(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getIssues(projectId, token) {
  const res = await fetch(`${API_URL}/issues/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createIssue(data, token) {
  const res = await fetch(`${API_URL}/issues?projectId=${data.projectId}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
