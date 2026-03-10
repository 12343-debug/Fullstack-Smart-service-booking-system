const SERVICE_VISUALS = [
  {
    match: ["clean", "cleaning", "maid", "housekeeping"],
    gradient: "linear-gradient(135deg, #d9f99d 0%, #86efac 50%, #14b8a6 100%)",
    accent: "#14532d",
    pattern:
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45) 0, transparent 28%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.35) 0, transparent 22%)",
  },
  {
    match: ["plumb", "water", "pipe", "tap"],
    gradient: "linear-gradient(135deg, #bfdbfe 0%, #60a5fa 45%, #0f766e 100%)",
    accent: "#082f49",
    pattern:
      "linear-gradient(90deg, rgba(255,255,255,0.18) 0 16%, transparent 16% 40%, rgba(255,255,255,0.18) 40% 56%, transparent 56%)",
  },
  {
    match: ["electric", "wire", "light", "fan"],
    gradient: "linear-gradient(135deg, #fef08a 0%, #facc15 42%, #f97316 100%)",
    accent: "#78350f",
    pattern:
      "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0, transparent 26%), linear-gradient(135deg, transparent 0 45%, rgba(255,255,255,0.24) 45% 55%, transparent 55%)",
  },
  {
    match: ["ac", "air", "cool", "refrigerator", "fridge"],
    gradient: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 40%, #2563eb 100%)",
    accent: "#172554",
    pattern:
      "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.35) 0, transparent 24%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.22) 0, transparent 18%)",
  },
  {
    match: ["paint", "wall", "decor"],
    gradient: "linear-gradient(135deg, #fecdd3 0%, #f9a8d4 45%, #a855f7 100%)",
    accent: "#4a044e",
    pattern:
      "linear-gradient(120deg, rgba(255,255,255,0.18) 0 22%, transparent 22% 46%, rgba(255,255,255,0.18) 46% 68%, transparent 68%)",
  },
  {
    match: ["carpent", "wood", "furniture"],
    gradient: "linear-gradient(135deg, #fed7aa 0%, #fb923c 45%, #7c2d12 100%)",
    accent: "#431407",
    pattern:
      "linear-gradient(90deg, rgba(255,255,255,0.18) 0 10%, transparent 10% 20%, rgba(255,255,255,0.14) 20% 30%, transparent 30%)",
  },
  {
    match: ["beauty", "salon", "spa", "makeup"],
    gradient: "linear-gradient(135deg, #fbcfe8 0%, #f472b6 48%, #ec4899 100%)",
    accent: "#500724",
    pattern:
      "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.36) 0, transparent 24%), radial-gradient(circle at 75% 25%, rgba(255,255,255,0.2) 0, transparent 18%)",
  },
  {
    match: ["pest", "sanit", "disinfect"],
    gradient: "linear-gradient(135deg, #bbf7d0 0%, #4ade80 45%, #15803d 100%)",
    accent: "#052e16",
    pattern:
      "linear-gradient(135deg, rgba(255,255,255,0.2) 0 18%, transparent 18% 42%, rgba(255,255,255,0.16) 42% 56%, transparent 56%)",
  },
];

export const getServiceVisual = (service) => {
  const lookup = `${service.title || ""} ${service.icon || ""}`.toLowerCase();

  return (
    SERVICE_VISUALS.find(({ match }) =>
      match.some((keyword) => lookup.includes(keyword)),
    ) || {
      gradient: "linear-gradient(135deg, #c7d2fe 0%, #818cf8 45%, #1d4ed8 100%)",
      accent: "#172554",
      pattern:
        "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.32) 0, transparent 24%), linear-gradient(135deg, transparent 0 50%, rgba(255,255,255,0.18) 50% 62%, transparent 62%)",
    }
  );
};
