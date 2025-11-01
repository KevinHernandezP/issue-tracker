import { useEffect, useState } from "react";
import { getIssues, createIssue } from "../lib/api";

const columnsOrder = ["To Do", "In Progress", "Done"];

export function useIssuesManager(token, project) {
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const data = await getIssues(project.id, token);
        const normalized = Array.isArray(data)
          ? data.map((i) => ({
              ...i,
              status: i.status || "To Do",
            }))
          : [];
        setIssues(normalized);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Error al cargar las incidencias");
      } finally {
        setLoading(false);
      }
    };

    if (project?.id && token) {
      fetchIssues();
    }
  }, [project?.id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newIssue = await createIssue(
        { ...form, projectId: project.id, status: "To Do" },
        token
      );
      setIssues((prev) => [...prev, newIssue]);
      setForm({ title: "", description: "" });
    } catch (err) {
      console.error("Error creating issue:", err);
      setError("Error al crear la incidencia");
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; 

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const updated = Array.from(issues); 
    const [movedIssue] = updated.splice(source.index, 1);

    movedIssue.status = destination.droppableId; 
    updated.splice(destination.index, 0, movedIssue); 

    setIssues(updated);
  };

  const grouped = columnsOrder.reduce((acc, col) => {
    acc[col] = issues.filter((i) => i.status === col);
    return acc;
  }, {});

  return {
    issues,
    form,
    loading,
    error,
    grouped,
    columnsOrder,
    setForm,
    handleSubmit,
    onDragEnd,
  };
}
