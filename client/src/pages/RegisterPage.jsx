import { Link } from "react-router";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10 text-white">

      {/* TODO:
          Reuse Starfield here if desired. */}

      <section className="relative z-10 w-full max-w-md">

        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            The Labyrinth
          </p>

          <h1 className="mt-3 text-3xl font-light tracking-tight">
            Enter the Labyrinth
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Create an account and begin mapping your paths.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl sm:p-8">

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white underline underline-offset-4 hover:text-zinc-300"
            >
              Login
            </Link>
          </p>

        </div>
      </section>
    </main>
  );
}