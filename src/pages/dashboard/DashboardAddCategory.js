import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { toast } from "react-toastify";
import slugify from "slugify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const DashboardAddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const handleAddCategory = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.name, {
      lower: true,
    });

    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...cloneValues,
        postStatus: "0",
      });
      toast.success("Create new category successfully!!!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
      });
    }
  };

  useEffect(() => {
    document.title = "Add new catogory";
  });
  return (
    <div className="m-9 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">New category</h1>
      <span className="text-gray-500 text-sm py-2 inline-block">
        Add new category
      </span>

      <form onSubmit={handleSubmit(handleAddCategory)}>
        <div className="flex flex-row justify-between items-center gap-10">
          <div className="my-8 w-[50%]">
            <label htmlFor="name" className="font-semibold py-2 inline-block">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full p-4 outline-none  border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter new category"
              {...register("name")}
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
              className="block w-full p-4 outline-none  border border-[#dfdede] transition-all focus:border-[#00B4AA] rounded-lg text-[#00B4AA] focus:bg-white"
              placeholder="Enter slug for new category"
              {...register("slug")}
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
            "Create new category"
          )}
        </button>
      </form>
    </div>
  );
};

export default DashboardAddCategory;
