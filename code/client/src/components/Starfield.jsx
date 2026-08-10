import Particles from "@tsparticles/react";
import { motion } from "motion/react";
export default function Starfield() {
  const options = {
    background: {
      color: "#000000",
    },
    particles: {
      number: {
        value: 40,
      },
      size: {
        value: { min: 1, max: 2 },
      },
      move: {
        enable: true, 
        speed: 0.3,
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
      },
    },
  };

  return <Particles id="labyrinth-stars" options={options} />;
}
