import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinInput, signupInput } from "@thejasgowda001/medium-common";
import axios from 'axios';
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [signupInput, setsignupInput] = useState<signupInput>({
    name: "",
    username: "",
    password: "",
  });

  const [signinInput, setsigninInput] = useState<signinInput>({
    username: "",
    password: "",
  });

  // Common error handler
  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMessage);
    } else {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const postSignupRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signupInput
      );
      const jwt = response.data.jwt;
      if (!jwt) {
        alert("Signup failed. Please try again.");
        return;
      }

      localStorage.setItem("token", jwt);
      alert("Account successfully created! Please log in.");
      navigate("/signin");
    } catch (error) {
      handleError(error);
    }
  };

  const postSigninRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signinInput
      );
      const jwt = response.data.jwt;

      if (!jwt) {
        alert("Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", jwt);
      alert("Logged in successfully!");
      navigate("/blogs");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className='h-screen flex justify-center flex-col'>
      <div className='flex justify-center'>
        <div>
          <div className='px-10'>
            <div className='text-3xl font-extrabold'>
              {type === "signin"
                ? "Login to your Account"
                : "Create an Account"}
            </div>
            <div className='text-slate-500'>
              {type === "signin"
                ? "Dont Have an Account?"
                : "Already have an account?"}
              <Link
                className='pl-2 underline'
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
          <div className='pt-8'>
            {type == "signup" ? (
              <LabelledInput
                label='Name'
                placeholder='Enter your name'
                onChange={(e) => {
                  setsignupInput({
                    ...signupInput,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            {type === "signup" ? (
              <LabelledInput
                label='Username'
                placeholder='Enter your email'
                onChange={(e) => {
                  setsignupInput({
                    ...signupInput,
                    username: e.target.value,
                  });
                }}
              />
            ) : (
              <LabelledInput
                label='Username'
                placeholder='Enter your email'
                onChange={(e) => {
                  setsigninInput({
                    ...signinInput,
                    username: e.target.value,
                  });
                }}
              />
            )}
            {type === "signup" ? (
              <LabelledInput
                label='Password'
                type={"password"}
                placeholder='Enter your password'
                onChange={(e) => {
                  setsignupInput({
                    ...signupInput,
                    password: e.target.value,
                  });
                }}
              />
            ) : (
              <LabelledInput
                label='password'
                type={"password"}
                placeholder='Enter your password'
                onChange={(e) => {
                  setsigninInput({
                    ...signinInput,
                    password: e.target.value,
                  });
                }}
              />
            )}
            <button
              type='button'
              onClick={
                type === "signup" ? postSignupRequest : postSigninRequest
              }
              className='mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <div>
      <div>
        <label className='block mb-2 text-sm font-semibold text-black pt-4 '>
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};
export default Auth;
