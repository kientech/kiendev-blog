import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { db } from "../../firebase/firebaseConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { toast } from "react-toastify";
import { postStatus } from "../../constant/constant";
import slugify from "slugify";
import { query, serverTimestamp } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import "./radio.css";
import { useAuth } from "../../contexts/authContext";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { addDoc, collection, where } from "firebase/firestore";
import Toggle from "../../components/toggle/Toggle";
import "react-dropdown/style.css";
Quill.register("modules/imageUploader", ImageUploader);

const schema = yup.object({
  title: yup.string().required("Please enter a title of post ✍️"),
  // slug: yup.string().required("Please enter a slug"),
});

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image"],
  ],
  imageUploader: {
    upload: async (file) => {
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      const response = await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?key=131f9c926fa8a5a553456a41727c66f4",
        data: bodyFormData,
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data.url;
    },
  },
};

const DashboardAddBlog = () => {
  const [categories, setCategories] = useState([]);
  const [valueCategory, setValueCategory] = useState("Blog");
  const [content, setContent] = useState("");
  const { userInfo } = useAuth();
  const [image, setImage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleAddBlog = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.postStatus = cloneValues.postStatus || "1";
    // cloneValues.category = valueCategory || "Blog";

    handleUploadImage(cloneValues.image);
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...cloneValues,
      image: image,
      category: valueCategory,
      username: userInfo.displayName,
      content: content,
      createdAt: serverTimestamp(),
    });
    toast.success("Created blog successfully!!!");
  };

  const handleUploadImage = (file) => {
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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    console.log("🚀 ~ onSelectImage ~ file:", file);
    if (!file) return;
    setValue("image", file);
    handleUploadImage(file);
  };

  const handleChange = (event) => {
    setValueCategory(event.target.value);
  };

  useEffect(() => {
    async function getCategories() {
      let result = [];
      const colRef = collection(db, "categories");
      const q = query(colRef, where("postStatus", "==", "0"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result); // Chỉ cập nhật một lần khi tất cả dữ liệu đã được xử lý xong
      console.log("🚀 ~ getCategories ~ result:", result);
    }

    getCategories();
  }, []); // Đảm bảo useEffect chỉ chạy một lần khi component mount

  return (
    <div className="m-9 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">Add new post</h1>
      <form onSubmit={handleSubmit(handleAddBlog)}>
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
              <input type="file" name="image" onChange={onSelectImage} />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="">Hot Blog</label>
          <Toggle></Toggle>
        </div>

        <div>
          <h1>Select a Category</h1>
          <select value={valueCategory} onChange={handleChange}>
            {categories.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 entry-block">
          <ReactQuill
            modules={modules}
            theme="snow"
            value={content}
            onChange={setContent}
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
            "Create new post"
          )}
        </button>
      </form>
    </div>
  );
};

export default DashboardAddBlog;
