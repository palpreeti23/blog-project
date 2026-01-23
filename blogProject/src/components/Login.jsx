import React from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/AuthSlice";
import { Link } from "react-router-dom";
import image from "../img/Gemini_Generated_Image_qtfelgqtfelgqtfe.png";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const login = async (data) => {
    authService.login(data).then((userData) => {
      if (userData) {
        dispatch(authLogin(userData));
      }
    });
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex w-2/3 h-120 ">
        <div className="w-1/2  ">
          <img
            className="w-full h-full rounded-l-xl"
            src={image}
            alt="placeholder"
          />
        </div>

        <div className="w-1/2 h-120 bg-gray-700 rounded-r-xl">
          <div className="h-auto flex justify-center items-center">
            <div className="rounded-xl m-4 p-9">
              <h2 className=" font-medium text-2xl text-white my-2  ">Login</h2>
              <form onSubmit={handleSubmit(login)} className="">
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
                  Login
                </Button>
              </form>
              <p className="text-white m-1 pr-2 ">
                Don't have an account?
                <Link to="/signup">
                  <span className="ml-1 hover:underline">Signup</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
