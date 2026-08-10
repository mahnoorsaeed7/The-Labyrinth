import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function ColdStartGate({ children }) {
  const [isWaking, setIsWaking] = useState(true);
  const [tookLong, setTookLong] = useState(false);

useEffect(() => {
    const timer = setTimeout(() => {
        setTookLong(true);
    }, 2500);

    fetch(`${API_URL}/api/health`)
        .finally(() => {
            clearTimeout(timer);
            setIsWaking(false);
        });

    return () => {
        clearTimeout(timer);
    };
}, []);

  if (isWaking && tookLong) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <div className="mx-auto mb-6 h-12 w-12 animate-pulse rounded-full bg-white/80 shadow-[0_0_60px_rgba(255,255,255,0.35)]" />

          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
            The Labyrinth
          </p>

          <h1 className="mt-3 text-xl font-light">
            The Labyrinth is stirring...
          </h1>
        </div>
      </main>
    );
  }

  return children;
}