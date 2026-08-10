import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PathCard from "../components/paths/PathCard";
import CreatePathForm from "../components/paths/CreatePathForm";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPaths() {
      try {
        const response = await fetch(`${API_URL}/api/paths`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorPath = await response.json().catch(() => ({}));
          throw new Error(errorPath.message || "Could not get the Path");
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
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>


       <CreatePathForm onCreated={handlePathCreated} />

      {paths.length === 0 ? (
        <div>
          <h2>No Path yet</h2>
          <p>
            You haven't created any Paths yet. Create your first Path using the
            form above to begin your journey.
          </p>
        </div>
      ) : (
        <section>
          
          {paths.map((path) => (
            <PathCard
              key={path._id || path.id}
              path={path}
            />
          ))}
        </section>
      )}
    </main>
  );
}
