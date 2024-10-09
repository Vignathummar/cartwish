import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z.string().min(8, { message: "Password should be 8 character" }),
});
const Loginpage = () => {
  const [formerror, setFormError] = useState("");
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      const { state } = location;
      window.location = state ? state.form : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section>
      <form
        className=" w-1/3 m-auto bg-white p-10 my-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl text-center font-semibold">Login From</h2>
        <div>
          <div className="mt-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="name"
              placeholder="Enter your name"
              className="w-full p-2  border border-gray-300 rounded"
              {...register("email")}
            />
            {errors.email && (
              <em className="text-red-700">{errors.email.message}</em>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("password")}
            />
            {errors.password && (
              <em className="text-red-700">{errors.password.message}</em>
            )}
          </div>
          {formerror && <em className="text-red-700">{formerror}</em>}
          <button
            type="submit"
            className="bg-[#6457f9] rounded text-white py-2 px-5 mt-5 w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Loginpage;
