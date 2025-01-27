import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { signupInput } from "@thejasgowda001/medium-common";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<signupInput>({
    name: "",
    username: "",
    password: "",
  });
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
            <LabelledInput
              label='Name'
              placeholder='Enter your name'
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label='Username'
              placeholder='Enter your email'
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />
            <LabelledInput
              label='Password'
              type={"password"}
              placeholder='Enter your password'
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              type='button'
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
          id='first_name'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};
export default Auth;
