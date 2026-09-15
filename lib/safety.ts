const blocked = [
  /nudif(y|ication)/i,
  /undress(ed|ing)?/i,
  /remove\s+(her|his|their)?\s*clothes/i,
  /naked\s+(celebrity|person|girl|woman|man)/i,
  /deepfake\s+(porn|sex|nude)/i,
  /minor|underage|child sexual/i,
];

export function validatePrompt(prompt: string) {
  const value = prompt.trim();
  if (!value) return { ok: false, reason: "Describe what you want to create." };
  if (value.length > 1200) return { ok: false, reason: "Prompt is too long." };
  if (blocked.some((pattern) => pattern.test(value))) {
    return { ok: false, reason: "That request is not supported. ALTER does not create non-consensual sexual deepfakes or nudification." };
  }
  return { ok: true as const };
}
