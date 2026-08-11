import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import PathCard from "../components/paths/PathCard";
import CreatePathForm from "../components/paths/CreatePathForm";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPaths() {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(`${API_URL}/api/paths`, {
          method: "GET",
          headers,
          credentials: "include",
        });

        if (!response.ok) {
          const errorPath = await response.json().catch(() => ({}));
          throw new Error(errorPath.message || errorPath.error || "Could not get the Path");
        }

        const dataPath = await response.json();
        setPaths(dataPath);
        return dataPath;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadPaths();
  }, []);

 function handlePathCreated(newPath) {
  setPaths((prevPaths) => [...prevPaths, newPath]);
}

  if (loading) {
    return <p>Loading your labyrinth paths...</p>;
  }

  if (error) {
    return <p>Error loading dashboard: {error}</p>;
  }

return (
  <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">

    <div className="mx-auto max-w-6xl">

      <header className="mb-10 flex flex-col gap-5 border-b border-zinc-900 pb-8 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Your Labyrinth
          </p>

          <h1 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
            Paths
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Welcome back, {user?.username || user?.email}
          </p>
        </div>
       
        <button
          onClick={logout}
          className="rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-600 hover:text-white"
        >
          Logout
        </button>
         <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-xl border border-zinc-800 px-4 py-2.5 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white"
        >
          ← Landing
        </button>

      </header>

      <section className="mb-10 rounded-2xl border border-zinc-900 bg-zinc-950/60 p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-medium">
            Uncover a new path
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Turn a complex goal into an explorable network.
          </p>
        </div>

        <CreatePathForm onCreated={handlePathCreated} />
      </section>

      {paths.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-zinc-800 px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            No paths yet
          </p>

          <h2 className="mt-3 text-xl font-light">
            Your Labyrinth is empty.
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            Create your first Path above and begin mapping the decisions
            that lead toward your goal.
          </p>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paths.map((path) => (
            <PathCard
              key={path._id || path.id}
              path={path}
            />
          ))}
        </section>
      )}

    </div>
  </main>
);
}
