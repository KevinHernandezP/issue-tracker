import { useEffect, useState } from "react";
import { getProjects } from "../lib/api";

export default function Projects({ token, onSelect }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects(token)
      .then(setProjects)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
          📁 Proyectos
        </h2>

        {loading ? (
          <div className="text-gray-500 italic">Cargando proyectos...</div>
        ) : projects.length === 0 ? (
          <div className="text-gray-500">No hay proyectos disponibles.</div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <li
                key={p.id}
                onClick={() => onSelect(p)}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg border border-gray-200"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🗂️</span>
                  <span className="font-medium text-gray-800">{p.name}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
