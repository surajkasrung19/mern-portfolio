export const normalizeProjectPayload = (body) => ({
  title: body.title?.trim(),
  description: body.description?.trim(),
  tech: Array.isArray(body.tech)
    ? body.tech.map((item) => String(item).trim()).filter(Boolean)
    : String(body.tech || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
  featured: Boolean(body.featured),
  live: body.live?.trim() || "#",
  github: body.github?.trim() || "",
  image: body.image?.trim() || "",
});
