import { useState } from "react";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";

export default function App() {
  const [token, setToken] = useState(null);
  const [project, setProject] = useState(null);

  if (!token) return <Login onLogin={setToken} />;
  if (!project) return <Projects token={token} onSelect={setProject} />;
  return <Issues token={token} project={project} />;
}
