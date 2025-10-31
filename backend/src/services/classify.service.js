const PYTHON_URL = process.env.PYTHON_URL || "http://127.0.0.1:5000";

export async function classifyIssue(title, description) {
  try {
    const response = await fetch(`${PYTHON_URL}/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) throw new Error("Error en la clasificación");

    const data = await response.json();
    return data.tags;
  } catch (err) {
    console.error("Error al clasificar issue:", err);
    return []; // fallback si falla
  }
}
