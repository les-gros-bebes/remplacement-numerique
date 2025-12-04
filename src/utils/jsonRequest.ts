export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export default function jsonRequest(
  url: string,
  method: HTTPMethod = "GET",
  data?: unknown
): Promise<unknown> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "GET" && data) {
    const queryParams = new URLSearchParams(data as Record<string, string>);
    url += `?${queryParams.toString()}`;
  }

  if (method !== "GET" && data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(
        JSON.stringify({
          url,
          method,
          data,
          error,
        })
      );
    });
}
