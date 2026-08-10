import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { loginSchema } from "../../lib/authSchemas";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {

  const { login: loginUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data) {
    setServerError(null);
    try {
     
      const pass = await loginUser(data);
   
      if (pass) {
        navigate("/dashboard");
      }
    } catch (error) {
      setServerError(error.message || "Invalid credentials. Please try again.");
    }
  }

return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-5"
  >

    <div>
      <label
        htmlFor="email"
        className="mb-2 block text-sm text-zinc-600"
      >
        Email
      </label>

      <input
        type="email"
        id="email"
        placeholder="you@example.com"
        {...register("email")}
        className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
      />

      {errors.email && (
        <p className="mt-2 text-sm text-red-400">
          {errors.email.message}
        </p>
      )}
    </div>

    <div>
      <label
        htmlFor="password"
        className="mb-2 block text-sm text-zinc-300"
      >
        Password
      </label>

      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        {...register("password")}
        className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
      />

      {errors.password && (
        <p className="mt-2 text-sm text-red-400">
          {errors.password.message}
        </p>
      )}
    </div>

    {serverError && (
      <div className="rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
        {serverError}
      </div>
    )}

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSubmitting ? "Entering..." : "Enter the Labyrinth"}
    </button>

  </form>
);
}
