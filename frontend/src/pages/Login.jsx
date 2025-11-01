import { useState } from "react";
import { login } from "../lib/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = await login(username, password);
    if (data.token) {
      onLogin(data.token);
    } else {
      setError("Usuario o contraseña inválidos. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="mx-auto h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-3">
            A
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Iniciar sesión en tu cuenta
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuario
            </label>
            <input
              id="username"
              className="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              className="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-md border border-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-3 mt-2 w-full rounded-md shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-105"
          >
            Entrar
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
            <a href="#" className="text-blue-600 hover:underline mx-2">
                ¿Olvidaste tu contraseña?
            </a>
             <span className="text-gray-400">|</span>
            <a href="#" className="text-blue-600 hover:underline mx-2">
                Crear cuenta
            </a> 
        </div>
      </div>
    </div>
  );
}
