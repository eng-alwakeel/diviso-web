export type Platform = "ios" | "android" | "desktop";

export const detectPlatform = (): Platform => {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  // iPadOS 13+ asks for the desktop site ("Macintosh") — a touch Mac is an iPad.
  if (/Macintosh/.test(ua) && (navigator.maxTouchPoints ?? 0) > 1) return "ios";
  if (/android/i.test(ua)) return "android";
  return "desktop";
};
