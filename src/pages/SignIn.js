import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/authContext";


const schema = yup.object({
  email: yup.string().required("Please enter your email!"),
  password: yup.string().required("Please enter your password!"),
});

const SignIn = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  const handleSignIn = async (values) => {
    console.log("🚀 ~ handleSignIn ~ values:", values);
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    

    toast.success("Sign in successfully 😍😍😍");
    navigate("/");
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000);
    // });
  };

  useEffect(() => {
    document.title = "Sign in KienDev Blog";

    if (userInfo?.email) navigate("/");
  }, [userInfo]);

  return (
    <div className="max-w-[600px] mx-auto  my-6">
      <img src="/images/logo.png" className="w-[100px] mx-auto" alt="" />
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="my-8">
          <label htmlFor="email" className="font-semibold py-2 inline-block">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="block w-full p-4 outline-none bg-[#dfdede] border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
            placeholder="Enter your email address"
            {...register("email")}
          />
        </div>

        <div className="my-8">
          <label htmlFor="password" className="font-semibold py-2 inline-block">
            Password
          </label>
          <input
            type="text"
            name="password"
            className="block w-full p-4 outline-none border bg-[#dfdede] border-[#dfdede] focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          className="relative flex items-center justify-center mx-auto my-6 transition ease-in-out delay-150 bg-gradient-to-r from-[#00B4AA] to-[#A4D96C] h-[70px] w-[300px] rounded-md text-white font-semibold hover:bg-gradient-to-r hover:from-[#A4D96C] hover:to-[#00B4AA]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="absolute rounded-lg inset-0 flex justify-center items-center opacity-80 hover:bg-gradient-to-r hover:from-[#00B4AA] hover:to-[#A4D96C] ">
              <LoadingSpinner />
            </div>
          ) : (
            "Sign in"
          )}
        </button>
        <p className="text-center text-sm">
          Already have an account?
          <NavLink to={"/sign-in"} className={"font-bold text-[#00B4AA] pl-2"}>
            Sign in
          </NavLink>
        </p>
      </form>
      {/* <LoadingSpinner></LoadingSpinner> */}
    </div>
  );
};

export default SignIn;
