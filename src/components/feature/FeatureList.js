import React, { useEffect, useState } from "react";
import FeatureItem from "./FeatureItem";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { where, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import LoadingSpinner from "../loading/LoadingSpinner";

const FeatureList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("postStatus", "==", "0"),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
      console.log("🚀 ~ snapshot.forEach ~ results:", results);
    });
  }, []);

  return (
    <div className="my-8">
      <span className="w-20 h-2 my-2 inline-block rounded-md bg-gradient-to-r from-[#00B4AA] to-[#A4D96C]"></span>
      <h1 className="text-3xl font-bold mb-6">Features</h1>
      <div className="grid grid-cols-3 gap-8 ">
        {posts.length > 0 ? (
          posts.map((post) => (
            <FeatureItem key={post.id} data={post}></FeatureItem>
          ))
        ) : (
          <LoadingSpinner className="border-black"></LoadingSpinner>
        )}
      </div>
    </div>
  );
};

export default FeatureList;
