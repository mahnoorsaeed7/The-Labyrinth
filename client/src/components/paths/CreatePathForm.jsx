import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const pathSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 letters")
    .max(100, "Title must be less than 100 letters")
    .trim(),
  description: z
    .string()
    .max(500, "Description must be less than 500 letters")
    .optional(),
  visibility: z.enum(["public", "private"]),
});

const API_URL = import.meta.env.VITE_API_URL || "";

export default function CreatePathForm({ onCreated }) {
  const [serverError, setServerError] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(pathSchema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "public",
    },
  });

  async function onSubmit(data) {
    setServerError(null);
    try {
      const response = await fetch(`${API_URL}/api/paths`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create path");
      }

      const newPath = await response.json();
      onCreated(newPath);
      reset();
    } catch (error) {
      setServerError(error.message);
    }
  }

return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="grid gap-5"
  >

    <div>
      <label
        htmlFor="path-title"
        className="mb-2 block text-sm text-zinc-300"
      >
        Path title
      </label>

      <input
        id="path-title"
        {...register("title")}
        placeholder="e.g. Learn MERN"
        className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
      />

      {errors.title && (
        <p className="mt-2 text-sm text-red-400">
          {errors.title.message}
        </p>
      )}
    </div>

    <div>
      <label
        htmlFor="path-description"
        className="mb-2 block text-sm text-zinc-300"
      >
        Description
      </label>

      <textarea
        id="path-description"
        rows={4}
        {...register("description")}
        placeholder="What are you trying to uncover?"
        className="w-full resize-y rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
      />

      {errors.description && (
        <p className="mt-2 text-sm text-red-400">
          {errors.description.message}
        </p>
      )}
    </div>

    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

      <div className="w-full sm:max-w-xs">
        <label
          htmlFor="path-visibility"
          className="mb-2 block text-sm text-zinc-300"
        >
          Visibility
        </label>

        <select
          id="path-visibility"
          {...register("visibility")}
          className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-zinc-500"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? "Creating..." : "Create Path"}
      </button>

    </div>

    {serverError && (
      <div className="rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
        {serverError}
      </div>
    )}

  </form>
);
}
