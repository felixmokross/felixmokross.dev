export async function enablePreviewMode(branch: string) {
  const response = await fetch("/api/preview", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ branch }),
  });

  if (response.status !== 200)
    throw new Error(`Message: ${(await response.json()).message}`);
}

export async function disablePreviewMode() {
  const response = await fetch("/api/preview", { method: "DELETE" });

  if (response.status !== 200)
    throw new Error(`Message: ${(await response.json()).message}`);
}
