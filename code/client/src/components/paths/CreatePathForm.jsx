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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register("description")} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Visibility</label>
        <select {...register("visibility")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {serverError && <p className="error">{serverError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Path"}
      </button>
    </form>
  );
}
