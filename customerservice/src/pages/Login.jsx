import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // API isteği gönderme
      const response = await axios.post(
        "http://localhost:8080/user/login",
        data
      );
      console.log("Login successful:", response.data);
      navigate("/user-management");
    } catch (error) {
      console.error("Login failed:", error);
      console.log("logindata", data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="border w-full px-4 py-2"
          />
          {errors.username && (
            <span className="text-red-500">Username is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="border w-full px-4 py-2"
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
        <div>
          <NavLink to="register">Click for Register</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
