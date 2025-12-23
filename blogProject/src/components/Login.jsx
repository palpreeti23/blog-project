import React from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/AuthSlice";
import { Link } from "react-router-dom";

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
    <div className="w-full h-screen ">
      <div className="flex">
        <div className="w-1/2 ">
          <img
            className="w-full h-screen"
            src="/src/img/ChatGPT Image Dec 23, 2025, 11_58_52 PM.png"
            alt=""
          />
        </div>

        <div className="w-1/2 h-screen bg-gray-700">
          <div className=" min-h-screen flex justify-center items-center">
            <div className="border rounded-xl m-4 p-9">
              <h2 className=" font-medium text-xl text-white my-3 ">Login</h2>
              <form onSubmit={handleSubmit(login)} className="">
                <Input
                  type="email"
                  label="Email"
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
                  className="text-gray-600"
                  placeholder="Enter your password"
                  {...register("Password", {
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
              <p className="text-white m-1 pr-2">
                Don't have an account?
                {/* <Link> */}
                <span className="ml-1">Signup</span>
                {/* </Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
