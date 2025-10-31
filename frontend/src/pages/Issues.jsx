import { useEffect, useState } from "react";
import { getIssues, createIssue } from "../lib/api";

export default function Issues({ token, project }) {
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const data = await getIssues(project.id, token);
        setIssues(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Error al cargar las incidencias");
        setIssues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [project.id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newIssue = await createIssue(
        { ...form, projectId: project.id },
        token
      );
      setIssues((prevIssues) => [...prevIssues, newIssue]);
      setForm({ title: "", description: "" });
    } catch (err) {
      console.error("Error creating issue:", err);
      setError("Error al crear la incidencia");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        🧾 Incidencias – <span className="text-green-600">{project.name}</span>
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-md shadow-sm mb-6 flex flex-col md:flex-row gap-3"
      >
        <input
          className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
        >
          Crear
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500 text-center italic">
          Cargando incidencias...
        </p>
      ) : error ? (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      ) : issues.length > 0 ? (
        <ul className="space-y-4">
          {issues.map((i) => (
            <li
              key={i.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-1">ID: #{i.id}</p>

                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Título:</span>{" "}
                  <span className="text-gray-800">
                    {i.title || "Sin título"}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Descripción:
                  </span>{" "}
                  <span className="text-gray-800">
                    {i.description || "Sin descripción"}
                  </span>
                </div>

                {i.tags && (
                  <div className="mt-2">
                    <span className="font-semibold text-gray-700">Tags:</span>{" "}
                    <div className="mt-1 flex flex-wrap gap-2">
                      {(Array.isArray(i.tags)
                        ? i.tags
                        : JSON.parse(i.tags || "[]")
                      ).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center italic">
          No hay incidencias para mostrar.
        </p>
      )}
    </div>
  );
}
