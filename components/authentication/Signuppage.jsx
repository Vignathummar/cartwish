import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import user from "../../assets/user.webp";
import { getUser, signup } from "../../services/userServices";
import { Navigate } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z.string().min(8, { message: "Password should be 8 character" }),
  confirmpassword: z.string().min(8),
  name: z
    .string()
    .min(3, { message: "Name should be atleast three character" }),
  deliveryAddress: z
    .string()
    .min(15, { message: "Address should be 15 character" }),
});
const Signuppage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await signup(formData);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
      }
    }
  };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section>
      <form
        className=" w-1/3 m-auto bg-white p-10 my-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl text-center font-semibold">SignUp From</h2>
        <div>
          <div className="mt-5">
            <div>
              <img
                src={profilePic ? URL.createObjectURL(profilePic) : user}
                className="w-24 h-24 object-contain m-auto rounded-full mb-5"
              />
            </div>
            <div className="text-center">
              <label
                htmlFor="file-ip-1"
                className="bg-[#6457f9] py-2 px-5 text-white rounded cursor-pointer"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="file-ip-1"
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-300 rounded hidden"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("name")}
            />
            {errors.name && (
              <em className="text-red-700">{errors.name.message}</em>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
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
          <div className="mt-5">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              placeholder="Enter your confirm password"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("confirmpassword")}
            />
            {errors.password && (
              <em className="text-red-700">{errors.password.message}</em>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              type="text"
              id="address"
              placeholder="Enter your address"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("deliveryAddress")}
            />
            {errors.address && (
              <em className="text-red-700">{errors.address.message}</em>
            )}
          </div>
          {formError && <em className="text-red-700">{formError}</em>}
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

export default Signuppage;
