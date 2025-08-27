import React, { useState, useEffect } from "react";
import { baseUrl } from "../../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Home = () => {
  const [userForm, setUserForm] = useState({
    UserName: "",
    EmailId: "",
    PhoneNumber: 0,
    Role: "",
    Id: ""
  });
  const [userList, setUserList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!isUpdating) {
        if (
          !userForm.UserName ||
          !userForm.EmailId ||
          !userForm.PhoneNumber ||
          !userForm.Role
        ) {
          alert("All fields are mandatory");
        }
        const data = await baseUrl.post("/addUser", userForm);
        if (data?.success) {
          alert(data?.message);
        }
      } else {
        const data = await baseUrl.put("/updateUser", userForm);
        if (data?.success) {
          alert(data?.message);
        }
        setUserForm({
          UserName: "",
          EmailId: "",
          PhoneNumber: 0,
          Role: "",
          Id: ""
        });
        setIsUpdating(false);
      }
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const data = await baseUrl.get("/userList");
      setUserList(data?.data.UserList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const { data } = await baseUrl.post("/deleteUser", { Id: id });
      if (data?.Success) {
        alert(data?.Message);
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async (data) => {
    setUserForm({
      UserName: data?.UserName,
      EmailId: data?.EmailId,
      PhoneNumber: data.PhoneNumber,
      Role: data?.Role,
      Id: data?._id
    });
    setIsUpdating(true);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="w-full px-5 min-h-[calc(100vh-60px)]">
      <div className="w-full grid grid-cols-4 gap-3 my-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="User Name"
            className="w-full border border-gray-100 text-grey-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="UserName"
            value={userForm.UserName}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Email"
            className="w-full border border-gray-100 text-grey-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="EmailId"
            value={userForm.EmailId}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Phone</label>
          <input
            type="number"
            placeholder="Phone Number"
            className="w-full border border-gray-100 text-grey-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="PhoneNumber"
            value={userForm.PhoneNumber}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Role</label>
          <input
            type="text"
            placeholder="Role"
            className="w-full border border-gray-100 text-grey-800 rounded-sm outline-1 outline-none h-8 px-2"
            name="Role"
            value={userForm.Role}
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-gray-700 text-white h-9 w-22 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="w-full mt-10">
        <div className="w-full">
          <table className="w-full bg-white divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email ID
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone Number
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-200">
              {userList?.map((user, idx) => {
                return (
                  <tr className="hover:bg-gray-200" key={idx}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {user?.UserName}{" "}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {user?.EmailId}{" "}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {user?.PhoneNumber}{" "}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {user?.Role}{" "}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="w-20 flex justify-center gap-5">
                        <div
                          className="h-8 w-8 flex justify-center items-center bg-red-100 text-red-600 cursor-pointer"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <span>
                            <MdDelete />
                          </span>
                        </div>
                        <div
                          className="h-8 w-8 flex justify-center items-center bg-green-100 text-green-600 cursor-pointer"
                          onClick={() => handleUpdateUser(user)}
                        >
                          <span>
                            <FaPen />
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
