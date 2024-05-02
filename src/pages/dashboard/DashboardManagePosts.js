import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, deleteDoc } from "firebase/firestore";
import ActionDelete from "../../components/actions/ActionDelete";
import ActionEdit from "../../components/actions/ActionEdit";
import ActionView from "../../components/actions/ActionView";
import { getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import Swal from "sweetalert2";

const DashboardManagePosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, []);

  const handleDeletePost = (postId) => {
    const colRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire({
          title: "Deleted!",
          text: "Your category has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="m-9 mr-0 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">Posts</h1>
      <span className="text-gray-500 text-sm py-2 inline-block">
        Manage all posts
      </span>

      <div class="overflow-x-auto  shadow-md sm:rounded-lg">
        <table className="table-auto max-w-5xl w-full rounded-lg ">
          <thead classsName="rounded-full">
            <tr className="bg-gray-200 text-left text-black font-bold rounded-full ">
              <th className=" px-4 py-2">Id</th>
              <th className=" px-4 py-2">Post</th>
              <th className=" px-12 py-2">Category</th>
              <th className=" px-4 py-2">Author</th>
              <th className=" px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 &&
              posts.map((post) => (
                <tr className=" border-b-[1px] border-[#dfdfdf]" key={post.id}>
                  <td className=" px-4 py-2 text-sm" title={post.id}>
                    {post.id.slice(0, 5) + "..."}
                  </td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap">
                    <div className="flex items-center justify-start gap-x-2">
                      <img
                        src={post?.image}
                        alt=""
                        className="flex-shrink-0 object-cover w-10 h-10 rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold" title={post?.title}>
                          {post?.title.slice(0, 15) + "..."}
                        </h3>
                        <time className="text-gray-500">
                          {new Date(
                            post?.createdAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td className=" px-4 py-4 text-sm text-gray-500 font-semibold">
                    {post?.category}
                  </td>
                  <td className=" px-4 py-4 text-sm font-semibold">
                    {post?.username}
                  </td>
                  <td className=" px-4 py-4 text-sm">
                    <div className="flex justify-between">
                      <ActionView
                        onClick={() => navigate(`/${post.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${post.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeletePost(post.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardManagePosts;
