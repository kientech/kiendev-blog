import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { toast } from "react-toastify";
import slugify from "slugify";
import "./radio.css";
import { auth } from "../../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const DashboardAddUser = () => {
  const [avatar, setAvatar] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: "0",
      role: "User",
    },
  });

  const handleAddUser = async (values) => {
    const cloneValues = { ...values };

    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);

    handleUploadImage(values.avatar);

    // Update user profile
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL: avatar,
    });

    const colRef = collection(db, "users");
    await addDoc(colRef, {
      ...cloneValues,
      avatar: avatar,
      username: slugify(cloneValues.fullname + "-tech", {
        lower: true,
        replacement: "",
      }),
      createdAt: serverTimestamp(),
    });
    toast.success(`Created new user with ${cloneValues.email} successfully!!!`);
    reset();
  };

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

  return (
    <div className="m-9 mr-0 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">New user</h1>
      <span className="text-gray-500 text-sm py-2 inline-block">
        Create a new user
      </span>

      <form onSubmit={handleSubmit(handleAddUser)}>
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
            "Create new user"
          )}
        </button>
      </form>
    </div>
  );
};

export default DashboardAddUser;
