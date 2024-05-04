import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { query, where } from "firebase/firestore";
import parse from "html-react-parser";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  console.log("🚀 ~ BlogDetail ~ post:", post);

  const date = post?.createdAt?.seconds
    ? new Date(post?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  useEffect(() => {
    async function fetchPost() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPost(doc.data());
        });
      });
    }
    fetchPost();
  }, [slug]);
  if (!slug || !post.title) return <PageNotFound></PageNotFound>;
  return (
    <div className="mt-9">
      <div className="flex items-center">
        <div className="w-[50%]">
          <img src={post.image} alt="" className="w-full rounded-lg" />
        </div>
        <div className="mx-10 w-[50%]">
          <span className="text-[#6B6B6B] py-2 px-4 rounded-lg bg-[#F3EDFF] text-sm">
            {post.category}
          </span>
          <h1 className="my-8 font-bold text-4xl text-[#23BB86] leading-relaxed">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500 ">
            {/* <NavLink to={`/${slugify(post.username, { lower: true })}`}> */}
            <span className="text-sm font-semibold">
              {post.username ? post.username : "Kien Duong Trung"}
            </span>
            {/* </NavLink> */}

            <span className="text-sm inline-block w-2 h-2 bg-gray-200 rounded-full mx-2"></span>
            <span>{formatDate}</span>
          </div>
        </div>
      </div>
      <div className=" my-20 max-w-[900px] mx-auto entry-block">
        {parse(post.content || "")}
      </div>
    </div>
  );
};

export default BlogDetail;
