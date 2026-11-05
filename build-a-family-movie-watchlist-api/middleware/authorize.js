export function authorizeModification(req, res, next) {
  if (!req.user) {
    return res.status(403).json({ error: "Access denied" });
  }

  const { role, id } = req.user;
  const targetUserId = req.params.userId;

  if (role === "parent") {
    return next();
  }

  if (role === "child" && String(id) === String(targetUserId)) {
    return next();
  }

  return res.status(403).json({ error: "Access denied" });
}
