import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";
import { postStatus } from "../../constant/constant";

const DashboardUpdatePost = () => {
  const [categories, setCategories] = useState([]);
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [valueCategory, setValueCategory] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleUpdatePost = () => {};

  useEffect(() => {
    async function fetchCategory() {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      console.log("🚀 ~ fetchCategory ~ singleDoc:", singleDoc.data());
    }
    fetchCategory();
  }, [postId, reset]);

  return (
    <div className="m-9 mr-0 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">Update post</h1>
      <span className="text-gray-500 text-sm py-2 inline-block">
        Update post id: {postId}
      </span>

      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="flex flex-row justify-between items-center gap-10">
          <div className="my-8 w-[50%]">
            <label htmlFor="title" className="font-semibold py-2 inline-block">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full p-4 outline-none bg-[#dfdede] border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter your email address"
              {...register("title")}
            />
          </div>

          <div className="my-8 w-[50%]">
            <label htmlFor="slug" className="font-semibold py-2 inline-block">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              className="block w-full p-4 outline-none bg-[#dfdede] border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter your email address"
              {...register("slug")}
            />
          </div>
        </div>
        <div className=" flex flex-row justify-between items-center">
          <div>
            <h1 className="font-semibold text-md text-black mb-2">Status</h1>
            <div className="radio-button-container">
              <div className="radio-button">
                <input
                  type="radio"
                  className="radio-button__input"
                  id="radio1"
                  value={postStatus.APPROVED}
                  {...register("postStatus")}
                />
                <label className="radio-button__label" for="radio1">
                  <span className="radio-button__custom"></span>
                  Approved
                </label>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  className="radio-button__input"
                  id="radio2"
                  value={postStatus.PENDING}
                  {...register("postStatus")}
                />
                <label className="radio-button__label" for="radio2">
                  <span className="radio-button__custom"></span>
                  Pending
                </label>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  className="radio-button__input"
                  id="radio3"
                  value={postStatus.REJECTED}
                  {...register("postStatus")}
                />
                <label className="radio-button__label" for="radio3">
                  <span className="radio-button__custom"></span>
                  Rejected
                </label>
              </div>
            </div>
          </div>

          <div className="my-8 w-[50%]">
            <label htmlFor="" className="">
              <span className="block font-semibold text-md text-black my-2">
                Feature image
              </span>
              <input type="file" name="image" />
            </label>
          </div>
        </div>

        <div>
          <h1>Select a Category</h1>
          {/* <select value={valueCategory} onChange={handleChange}>
            {categories.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select> */}
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
            "Update post"
          )}
        </button>
      </form>
    </div>
  );
};

export default DashboardUpdatePost;
