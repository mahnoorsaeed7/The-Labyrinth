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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username Field */}
      <div>
        <label htmlFor="username">Username</label>
        <input 
          type="text"
          id="username"
          placeholder="Enter Username"
          {...register("username")} 
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
      </div>

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
        {isSubmitting ? "Creating..." : "Register"}
      </button>
    </form>
  );
}
