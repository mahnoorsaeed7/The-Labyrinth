import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import Starfield from "../components/Starfield";

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
    // TODO:
    // 1. Store the clicked label.
    setSelectedChip(label);
    // 2. Start the zoom transition.
    setIsZooming(true);
    // 3. Do NOT navigate yet.
    // label.prevent.defaultl

  }

  function handleTransitionComplete() {
    // TODO:
    // 1. Check whether user exists.
    if(!user){
        navigate("/register");
        return;
    }
    // 2. Authenticated → /dashboard
    // 3. Anonymous → /register
    navigate("/dashboard");
  }

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
                    // TODO:
                    // Animate scale between approximately 1 and 1.08.
                    scale: [1, 1.08],
                }}
                transition={{
                    // TODO:
                    // Make the animation repeat forever.
                    // Reverse direction each cycle.
                    duration:2,
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