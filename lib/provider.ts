export type GenerateInput = { prompt: string; mode: string };

function demoSvg(prompt: string, mode: string) {
  const safe = prompt.replace(/[<>&\"]/g, "").slice(0, 90);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1280"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#302750"/><stop offset="1" stop-color="#10121a"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="512" cy="420" r="180" fill="#a98cff" opacity=".12"/><text x="70" y="1040" fill="white" font-family="Arial" font-weight="700" font-size="60">ALTER AI</text><text x="70" y="1110" fill="#b9b4ca" font-family="Arial" font-size="30">${mode.toUpperCase()}</text><text x="70" y="1180" fill="#8f95a7" font-family="Arial" font-size="23">${safe}</text></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function generateImage(input: GenerateInput) {
  if (process.env.DEMO_MODE === "true" || !process.env.AI_IMAGE_ENDPOINT) {
    return { imageUrl: demoSvg(input.prompt, input.mode), provider: "demo" };
  }
  const response = await fetch(process.env.AI_IMAGE_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env.AI_IMAGE_API_KEY ?? ""}` },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`AI provider error: ${response.status}`);
  const data = await response.json() as { imageUrl?: string; output?: string };
  const imageUrl = data.imageUrl ?? data.output;
  if (!imageUrl) throw new Error("AI provider returned no image URL");
  return { imageUrl, provider: "external" };
}
