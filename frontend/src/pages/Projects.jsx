import { useEffect, useState } from "react";
import { getProjects } from "../lib/api";

export default function Projects({ token, onSelect }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(token).then(setProjects);
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Proyectos</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id} className="cursor-pointer" onClick={() => onSelect(p)}>
            🗂️ {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
