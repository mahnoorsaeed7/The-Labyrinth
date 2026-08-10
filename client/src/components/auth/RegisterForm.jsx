import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { registerSchema } from "../../lib/authSchemas";
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
// React Hook Form
//        │
//        ▼
// zodResolver
//        │
//        ▼
// registerSchema  
//  connection to zod to able to perform so when user submit 
// form values
//      ↓
// RHF
//      ↓
// Zod
//      ↓
// valid?
// if invalid :
// errors.username
// errors.email
// errors.password
  async function onSubmit(data) {
    setServerError(null);
    try {
      const pass = await registerUser(data);
      if (pass) {
        navigate("/dashboard");
      }
    } catch (error) {
      setServerError(error.message);
    }
  }

return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-5"
  >

    <div>
      <label
        htmlFor="username"
        className="mb-2 block text-sm text-zinc-300"
      >
        Username
      </label>

      <input
        type="text"
        id="username"
        placeholder="Choose a username"
        {...register("username")}
        className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
      />

      {errors.username && (
        <p className="mt-2 text-sm text-red-400">
          {errors.username.message}
        </p>
      )}
    </div>

    <div>
      <label
        htmlFor="email"
        className="mb-2 block text-sm text-zinc-300"
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
        placeholder="Create a password"
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
      className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSubmitting ? "Creating..." : "Create Account"}
    </button>

  </form>
);
}
