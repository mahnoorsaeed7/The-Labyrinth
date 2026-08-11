import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import Starfield from "../components/Starfield";

const API_URL = import.meta.env.VITE_API_URL || "";

const EXAMPLE_PATHS = [
  "Learn MERN",
  "Study Abroad",
  "Build a Startup",
  "Switch Careers",
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedChip, setSelectedChip] = useState(null);
  const [isZooming, setIsZooming] = useState(false);

  function handleChipClick(label) {
  
    setSelectedChip(label);
    setIsZooming(true);

  }
//------------------------------------------------------------------------------------------------------------------------
async function handleTransitionComplete() {
  if (!user) {
    navigate("/register");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await fetch(`${API_URL}/api/paths`, {
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch paths");
      navigate("/dashboard");
      return;
    }

    const paths = await response.json();

    const selectedPath = paths.find(
      (path) => path.title === selectedChip
    );

    if (!selectedPath) {
      console.error(
        `Path "${selectedChip}" was not found.`
      );
      navigate("/dashboard");
      return;
    }

    navigate(`/path/${selectedPath._id}`);
  } catch (error) {
    console.error("Failed to load selected path:", error);
    navigate("/dashboard");
  }
}
//------------------------------------------------------------------------------------------------------------------------
     return (
    <main className="relative min-h-screen select-none bg-black text-white overflow-hidden">
      <Starfield />

    <AnimatePresence mode="wait">
    {!isZooming ? (
        <motion.div
        key="content"
        exit={{ opacity: 0 }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-4"
        >
        <motion.div
                className="h-32 w-32 rounded-full"
                style={{
                      background:
                     "radial-gradient(circle, white 0%, rgba(255,255,255,0.6) 25%, transparent 70%)",
                }}
                animate={{
                  
                    scale: [1, 1.08],
                }}
                transition={{
                 
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
        />
        <h1 className="select-none text-center text-4xl font-light md:text-4xl">
             What path are you trying to uncover?
        </h1>

        <div className="select-none flex flex-wrap justify-center gap-3">
            {EXAMPLE_PATHS.map((label)=> (
                <button
                    key={label}
                    onClick={() => handleChipClick(label)}
                    className="rounded-full border border-zinc-700 px-4 py-2 text-sm transition hover:border-zinc-400"
                >
                    {label}
                </button>
            ))}
        </div>
        </motion.div>
    ) : (
    
        <motion.div
                key="zoom"
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    background:
                    "radial-gradient(circle, white 0%, transparent 70%)",
                }}
                initial={{
                    scale: 1,
                }}
                animate={{
                    scale: 30,
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeIn",
                }}
                onAnimationComplete={handleTransitionComplete}
                />
      
    )}
    </AnimatePresence>
    </main>
  );

// return (
//   <main className="relative min-h-screen bg-black text-white overflow-hidden">
//     <Starfield />

//     <div className="relative z-10">
//       <h1>TEST</h1>
//     </div>
//   </main>
// );
}