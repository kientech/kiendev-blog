import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, deleteDoc } from "firebase/firestore";
import ActionDelete from "../../components/actions/ActionDelete";
import ActionEdit from "../../components/actions/ActionEdit";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import Swal from "sweetalert2";

const DashboardManageUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleDeleteUser = async (docId) => {
    const colRef = doc(db, "users", docId);
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

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUsers(results);
      });
    }
    fetchData();
  }, []);
  return (
    <div className="m-9 mr-0 w-[75%]">
      <h1 className="font-bold text-3xl text-[#1DC071]">Users</h1>
      <span className="text-gray-500 text-sm py-2 inline-block">
        Manage all users
      </span>

      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
        />
      </div>

      <div class="overflow-x-auto  shadow-md sm:rounded-lg">
        <table className="table-auto max-w-5xl w-full rounded-lg ">
          <thead classsName="rounded-full">
            <tr className="bg-gray-200 text-left text-black font-bold rounded-full ">
              <th className=" px-4 py-2">Id</th>
              <th className=" px-4 py-2">Info</th>
              <th className=" px-12 py-2">Username</th>
              <th className=" px-4 py-2">Email</th>
              <th className=" px-4 py-2">Status</th>
              <th className=" px-4 py-2">Role</th>
              <th className=" px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => (
                <tr className=" border-b-[1px] border-[#dfdfdf]" key={user.id}>
                  <td className=" px-4 py-2 text-sm" title={user.id}>
                    {user.id.slice(0, 5) + "..."}
                  </td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap">
                    <div className="flex items-center justify-start gap-x-2">
                      <img
                        src={user?.avatar}
                        alt=""
                        className="flex-shrink-0 object-cover w-10 h-10 rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{user?.fullname}</h3>
                        <time className="text-gray-500">
                          {new Date(
                            user?.createdAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td className=" px-12 py-2 text-sm whitespace-nowrap">
                    {user?.username}
                  </td>
                  <td className=" px-4 py-2 text-sm">{user?.email}</td>
                  {user.status === "0" ? (
                    <td className=" px-4 py-2">
                      <span className="text-[#1DC071] text-sm py-2 px-4  font-bold rounded-lg bg-[#F1FBF7]">
                        Approved
                      </span>
                    </td>
                  ) : (
                    <td className=" px-4 py-2">
                      <span className="text-[#FD9704] font-bold text-sm py-2 px-4 rounded-lg bg-[#FD97041A]">
                        Unapproved
                      </span>
                    </td>
                  )}
                  <td className=" px-4 py-4 text-sm">
                    <span className="px-4 py-2 rounded-lg bg-emerald-200 text-green-800 font-semibold">
                      {user?.role}
                    </span>
                  </td>
                  <td className=" px-4 py-4 text-sm">
                    <div className="flex justify-between">
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-user?id=${user.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteUser(user.id)}
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

export default DashboardManageUser;
