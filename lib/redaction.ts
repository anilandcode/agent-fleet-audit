const SECRET_KEY = /(api[_-]?key|authorization|token|password|secret|cookie)/i;
const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

export function digest(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fnv1a_${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export function redactAttributes(attributes: Record<string, string | number | boolean>): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(attributes).map(([key, value]) => {
      if (SECRET_KEY.test(key)) return [key, "[redacted]"];
      if (typeof value === "string") return [key, value.replace(EMAIL, "[email]").slice(0, 500)];
      return [key, value];
    }),
  );
}
