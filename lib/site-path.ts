// Public assets and plain HTML links need the same prefix as Next.js routes.
export function sitePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
