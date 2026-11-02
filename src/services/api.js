const API_URL = "http://localhost:5000/api";

export async function apiRequest(
  path,
  { method = "GET", body, token, signal } = {}
) {
  const headers = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    signal,
    ...(body !== undefined
      ? { body: JSON.stringify(body) }
      : {}),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.error || `Error HTTP ${response.status}`
    );

    error.status = response.status;
    throw error;
  }

  return data;
}