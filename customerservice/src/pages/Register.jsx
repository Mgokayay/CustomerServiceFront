import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/customer", data);
      console.log("Registration successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      console.log("registerdata", data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            className="border w-full px-4 py-2"
          />
          {errors.firstName && (
            <span className="text-red-500">First Name is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            className="border w-full px-4 py-2"
          />
          {errors.lastName && (
            <span className="text-red-500">Last Name is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            className="border w-full px-4 py-2"
          />
          {errors.email && (
            <span className="text-red-500">Valid email is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Region</label>
          <input
            type="text"
            {...register("region", { required: true })}
            className="border w-full px-4 py-2"
          />
          {errors.region && (
            <span className="text-red-500">Region is required</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Register
        </button>
        <div className="mt-4">
          <NavLink to="/">Already have an account? Login</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Register;
