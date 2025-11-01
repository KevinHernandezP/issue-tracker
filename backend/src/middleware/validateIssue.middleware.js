export function validateIssue(req, res, next) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  if (title.length < 3) {
    return res.status(400).json({ error: "Title must be at least 3 characters long" });
  }

  next();
}
