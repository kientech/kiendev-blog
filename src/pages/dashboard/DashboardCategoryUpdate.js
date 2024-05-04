import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";

const DashboardCategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  useEffect(() => {
    async function fetchCategory() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      console.log("🚀 ~ fetchCategory ~ singleDoc:", singleDoc.data());
    }
    fetchCategory();
  }, [categoryId, reset]);

  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
    });
    toast.success("Updated category successfully");
    navigate("/manage/categories");
  };
  if (!categoryId) return null;
  return (
    <div className="m-9 mr-0 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">Update category</h1>
      <span className="text-gray-500 text-sm py-2 inline-block">
        Update your category id: {categoryId}
      </span>

      <div>
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
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
              "Update category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardCategoryUpdate;
