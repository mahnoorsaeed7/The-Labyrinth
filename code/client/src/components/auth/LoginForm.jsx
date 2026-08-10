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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <div>
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          placeholder="Enter Email"
          {...register("email")} 
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          id="password"
          placeholder="Enter Password"
          {...register("password")} 
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>

      {/* Server Error Display */}
      {serverError && <p style={{ color: "red", fontWeight: "bold" }}>{serverError}</p>}

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
