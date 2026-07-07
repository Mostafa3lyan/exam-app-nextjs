type RequestConfig = RequestInit & {
  params?: Record<string, string | number | undefined>;
};

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | undefined>
) {
  const isInternalRoute = endpoint.startsWith("/api/");
  const base = isInternalRoute
    ? typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXTAUTH_URL ?? "http://localhost:3000")
    : process.env.NEXT_PUBLIC_API;

  const url = new URL(endpoint, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
}

export async function api<T>(
  endpoint: string,
  config?: RequestConfig
): Promise<T> {
  const { params, headers, ...rest } = config ?? {};
  const isInternalRoute = endpoint.startsWith("/api/");

  const res = await fetch(buildUrl(endpoint, params), {
    ...rest,
    credentials: isInternalRoute ? "include" : rest.credentials,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message ?? "Something went wrong");

  return data;
}