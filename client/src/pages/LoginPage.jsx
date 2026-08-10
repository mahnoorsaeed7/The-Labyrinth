import { Link } from "react-router";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10 text-white">
      
     

      <section className="relative z-10 w-full max-w-md">

        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            The Labyrinth
          </p>

          <h1 className="mt-3 text-3xl font-light tracking-tight">
            Return to your path
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Continue exploring the paths you have uncovered.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl sm:p-8">

          <LoginForm />

          <p className="mt-6 text-center text-sm text-zinc-500">
            New to the Labyrinth?{" "}
            <Link
              to="/register"
              className="text-white underline underline-offset-4 hover:text-zinc-300"
            >
              Create an account
            </Link>
          </p>

        </div>
      </section>
    </main>
  );
}