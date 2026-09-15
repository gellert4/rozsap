import { NextResponse } from "next/server";
import { generateImage } from "@/lib/provider";
import { validatePrompt } from "@/lib/safety";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = String(body.prompt ?? "");
    const mode = String(body.mode ?? "photoshoot");
    const safety = validatePrompt(prompt);
    if (!safety.ok) return NextResponse.json({ error: safety.reason }, { status: 400 });
    const allowed = new Set(["photoshoot", "recreate", "outfit", "portrait"]);
    if (!allowed.has(mode)) return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
    const output = await generateImage({ prompt, mode });
    return NextResponse.json({ ...output, creditsUsed: 1 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Generation failed." }, { status: 500 });
  }
}
