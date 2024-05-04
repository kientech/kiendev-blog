import React, { useState } from "react";
import { useEffect } from "react";
import ActionView from "../../components/actions/ActionView";
import ActionEdit from "../../components/actions/ActionEdit";
import ActionDelete from "../../components/actions/ActionDelete";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  getDoc,
  deleteDoc,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { where, query } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const DashboardManageCategories = () => {
  const CATEGORY_PER_PAGE = 3;
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [filter, setFilter] = useState(undefined);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc || 0),
      limit(CATEGORY_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories([...categories, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategories(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);

  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, "categories", docId);
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
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  return (
    <div className="m-9 mr-0 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">All categories</h1>
      <span className="text-gray-500 text-sm py-2 inline-block">
        Manage all categories
      </span>

      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>

      <div className="my-9">
        <table className="table-auto w-full rounded-lg overflow-hidden">
          <thead className="rounded-full">
            <tr className="bg-gray-200 text-left text-black font-bold rounded-full ">
              <th className="w-1/5 px-4 py-2">Id</th>
              <th className="w-1/5 px-4 py-2">Name</th>
              <th className="w-1/5 px-4 py-2">Slug</th>
              <th className="w-1/5 px-4 py-2">Status</th>
              <th className="w-1/5 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr
                  className=" border-b-[1px] border-[#dfdfdf]"
                  key={category.id}
                >
                  <td className="w-1/5 px-4 py-2 text-sm">{category.id}</td>
                  <td className="w-1/5 px-4 py-2 text-sm font-bold">
                    {category.name}
                  </td>
                  <td className="w-1/5 px-4 py-2 text-sm text-gray-500 italic">
                    {category.slug}
                  </td>
                  {category.postStatus === "0" ? (
                    <td className="w-1/5 px-4 py-2">
                      <span className="text-[#1DC071] text-sm py-2 px-4  font-bold rounded-lg bg-[#F1FBF7]">
                        Approved
                      </span>
                    </td>
                  ) : (
                    <td className="w-1/5 px-4 py-2">
                      <span className="text-[#FD9704] font-bold text-sm py-2 px-4 rounded-lg bg-[#FD97041A]">
                        Unapproved
                      </span>
                    </td>
                  )}
                  <td className="w-1/5 px-4 py-4 text-sm">
                    <div className="flex justify-between">
                      <ActionView></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-category?id=${category.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteCategory(category.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        {total > categories.length ? (
          <button
            onClick={handleLoadMoreCategory}
            className="w-[200px] h-[60px] bg-[#1DC071] text-white font-bold flex justify-center items-center mx-auto rounded-lg"
          >
            Load more
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashboardManageCategories;
