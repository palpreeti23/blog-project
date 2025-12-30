import React from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
import image from "../img/Gemini_Generated_Image_qtfelgqtfelgqtfe.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (data) => {
    const session = await authService.createAccount(data);
    if (session) {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login(userData));
        navigate("/");
      }
    }
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex w-2/3 h-120">
        <div className="w-1/2 ">
          <img className="w-full h-full rounded-l-xl" src={image} alt="" />
        </div>

        <div className="w-1/2 h-120 bg-gray-700 rounded-r-xl">
          <div className=" h-auto flex justify-center items-center">
            <div className=" m-4 px-9 py-4">
              <h2 className=" font-medium text-2xl text-white my-4 ">Signup</h2>
              <form onSubmit={handleSubmit(create)} className="">
                <Input
                  type="name"
                  label="Name"
                  labelClassName="text-white"
                  className="text-gray-600"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: true,
                  })}
                />

                <Input
                  type="email"
                  label="Email"
                  labelClassName="text-white"
                  className="text-gray-600"
                  placeholder="Enter your Email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />

                <Input
                  type="password"
                  label="Password"
                  labelClassName="text-white"
                  className="text-gray-600"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: true,
                  })}
                />

                <Button
                  type="submit"
                  className="hover:border hover:shadow-xl "
                  bgColor="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 "
                >
                  Signup
                </Button>
              </form>
              <p className="text-white m-1 pr-2">
                Already have an account?
                <Link to="/login">
                  <span className="ml-1 hover:underline">Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
