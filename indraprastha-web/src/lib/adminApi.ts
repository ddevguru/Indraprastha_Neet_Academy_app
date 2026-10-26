export const BACKEND_API_BASE = "https://api.indraprasthaneetacademy.com/api";

let cachedAdminToken: string | null = null;
let tokenExpiry = 0;

export async function getAdminToken(): Promise<string> {
  const now = Date.now();
  if (cachedAdminToken && now < tokenExpiry) {
    return cachedAdminToken;
  }

  const loginRes = await fetch(`${BACKEND_API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "indraprasthaadmin",
      password: "indraprastha@123",
    }),
    cache: "no-store",
  });

  if (!loginRes.ok) {
    throw new Error(`Admin login failed with status ${loginRes.status}`);
  }

  const data = await loginRes.json();
  if (!data.token) {
    throw new Error("Admin login succeeded but no token was returned");
  }

  cachedAdminToken = data.token;
  // Cache for 6 hours
  tokenExpiry = now + 6 * 60 * 60 * 1000;
  return data.token;
}

export async function fetchAdmin(endpoint: string, options: RequestInit = {}): Promise<Response> {
  let token = await getAdminToken();
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Content-Type") && options.method && options.method !== "GET") {
    headers.set("Content-Type", "application/json");
  }

  const url = endpoint.startsWith("http") ? endpoint : `${BACKEND_API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  let res = await fetch(url, { ...options, headers, cache: "no-store" });

  // If token somehow expired on server side, retry once with fresh login
  if (res.status === 401) {
    cachedAdminToken = null;
    tokenExpiry = 0;
    token = await getAdminToken();
    headers.set("Authorization", `Bearer ${token}`);
    res = await fetch(url, { ...options, headers, cache: "no-store" });
  }

  return res;
}
