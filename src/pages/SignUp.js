import React from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="max-w-[600px] mx-auto  my-6">
      <img src="/images/logo.png" className="w-[100px] mx-auto" alt="" />
      <form>
        <div className="my-2">
          <label htmlFor="fullname" className="font-semibold py-2 inline-block">
            Fullname
          </label>
          <input
            type="text"
            name="fullname"
            className="block w-full p-4 outline-none border border-[#999999] focus:border-[#00B4AA] rounded-lg"
            placeholder="Enter your fullname"
          />
        </div>

        <div className="my-2">
          <label htmlFor="fullname" className="font-semibold py-2 inline-block">
            Email address
          </label>
          <input
            type="text"
            name="fullname"
            className="block w-full p-4 outline-none border border-[#999999] transition-all focus:border-[#00B4AA] rounded-lg"
            placeholder="Enter your email address"
          />
        </div>

        <div className="my-2">
          <label htmlFor="fullname" className="font-semibold py-2 inline-block">
            Password
          </label>
          <input
            type="text"
            name="fullname"
            className="block w-full p-4 outline-none border border-[#999999] focus:border-[#00B4AA] rounded-lg"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit"> Sign up</button>

        <p>
          Already have an account?
          <NavLink to={"/sign-in"}>Sign in</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
