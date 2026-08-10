import { useEffect } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function Starfield() {
  useEffect(() => {
    let destroyed = false;
    let container;

    async function createStarfield() {
      if (document.getElementById("labyrinth-stars-canvas")) {
        return;
      }

      await loadSlim(tsParticles);

      if (destroyed) return;

      container = await tsParticles.load({
        id: "labyrinth-stars",

        options: {
          fullScreen: {
            enable: false,
          },

          background: {
            color: {
              value: "#000000",
            },
          },

          particles: {
            number: {
              value: 100,
            },

            color: {
              value: "#ffffff",
            },

            shape: {
              type: "circle",
            },

            size: {
              value: {
                min: 1,
                max: 2,
              },
            },

            opacity: {
              value: {
                min: 0.3,
                max: 0.7,
              },
            },

            move: {
              enable: true,
              speed: 0.3,
            },
          },

          detectRetina: true,
        },
      });
    }

    createStarfield();

    return () => {
      destroyed = true;
      container?.destroy();
    };
  }, []);

  return (
    <div
      id="labyrinth-stars"
      className="absolute inset-0 z-0"
    />
  );
}