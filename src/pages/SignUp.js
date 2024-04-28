import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/authContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname!!!"),
  email: yup.string().required("Please enter your email!"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password!"),
});

const SignUp = () => {
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

  const handleSignUp = async (values) => {
    console.log("🚀 ~ handleSignUp ~ values:", values);
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);

    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });

    const colRef = collection(db, "users");
    addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      createdAt: serverTimestamp(),
    });

    toast.success("Registered successfully 😍😍😍");
    navigate("/");
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000);
    // });
  };

  useEffect(() => {
    document.title = "Register KienDev Blog";

    if (userInfo?.email) navigate("/");
  }, [userInfo]);

  return (
    <div className="max-w-[600px] mx-auto  my-6">
      <img src="/images/logo.png" className="w-[100px] mx-auto" alt="" />
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="my-8">
          <label htmlFor="fullname" className="font-semibold py-2 inline-block">
            Fullname
          </label>
          <input
            type="text"
            name="fullname"
            className="block w-full p-4 outline-none bg-[#dfdede] border border-[#dfdede] focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
            placeholder="Enter your fullname"
            {...register("fullname")}
          />
        </div>

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
            "Sign up"
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

export default SignUp;
