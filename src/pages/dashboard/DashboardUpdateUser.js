import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { db } from "../../firebase/firebaseConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { toast } from "react-toastify";
import slugify from "slugify";
import "./radio.css";
import { useAuth } from "../../contexts/authContext";
import { auth } from "../../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashboardUpdateUser = () => {
  const [avatar, setAvatar] = useState("");
  const [params] = useSearchParams();
  const userId = params.get("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      status: "0",
      role: "0",
    },
  });

  const handleUploadImage = (file) => {
    if (!file) {
      console.log("No file provided for upload");
      return; // Exit if no file is provided
    }

    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing");
        }
      },
      (error) => {
        console.error("Upload failed", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setAvatar(downloadURL);
        });
      }
    );
  };

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    console.log("Selected file:", file);
    setValue("avatar", file);
    handleUploadImage(file);
  };

  useEffect(() => {
    async function fetchUser() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      setAvatar(singleDoc.data().avatar);
      reset(singleDoc.data());
      console.log("🚀 ~ fetchCategory ~ singleDoc:", singleDoc.data());
    }
    fetchUser();
  }, [userId, reset]);

  const handleUpdateUser = async (values) => {
    const cloneValues = { ...values };
    handleUploadImage(values.avatar);

    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      ...cloneValues,
      avatar: avatar,
      username: slugify(cloneValues.fullname + "-tech", {
        lower: true,
        replacement: "",
      }),
      createdAt: serverTimestamp(),
    });
    toast.success("Updated user successfully");
    navigate("/manage/users");
  };

  return (
    <div className="m-9 mr-0 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">Update user</h1>
      <span className="text-gray-500 text-sm py-2 inline-block">
        Update user id: {userId}
      </span>

      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="flex flex-row justify-between items-center gap-x-10">
          <div className="w-[50%]">
            <label
              htmlFor="fullname"
              className="font-semibold py-2 inline-block"
            >
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="block w-full p-4 outline-none  border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter fullname"
              {...register("fullname")}
            />
          </div>

          <div className="my-4 w-[50%]">
            <label
              htmlFor="username"
              className="font-semibold py-2 inline-block"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="block w-full p-4 outline-none  border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter username"
              {...register("username")}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center gap-10">
          <div className="w-[50%]">
            <label
              htmlFor="fullname"
              className="font-semibold py-2 inline-block"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full p-4 outline-none  border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter email"
              {...register("email")}
            />
          </div>

          <div className="my-4 w-[50%]">
            <label
              htmlFor="password"
              className="font-semibold py-2 inline-block"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full p-4 outline-none  border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter password"
              {...register("password")}
            />
          </div>
        </div>

        <div className="my-8 w-[50%]">
          <label htmlFor="" className="">
            <span className="block font-semibold text-md text-black my-2">
              Avatar
            </span>
            <input type="file" name="avatar" onChange={onSelectImage} />
          </label>

          <div className="my-4 w-[50%]">
            <label htmlFor="phone" className="font-semibold py-2 inline-block">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="block w-full p-4 outline-none  border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter phone"
              {...register("phone")}
            />
          </div>

          <div className="my-4 w-[50%]">
            <label
              htmlFor="birthday"
              className="font-semibold py-2 inline-block"
            >
              Date of birth
            </label>
            <input
              type="text"
              name="birthday"
              id="birthday"
              className="block w-full p-4 outline-none  border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter birthday"
              {...register("birthday")}
            />
          </div>
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
            "Update user"
          )}
        </button>
      </form>
    </div>
  );
};

export default DashboardUpdateUser;
