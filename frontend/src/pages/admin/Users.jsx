import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";
import { getAllUser, updateUserRole } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const Users = () => {
  const dispatch = useDispatch();
  const { loading, error, users, user } = useSelector((state) => state.users);
  const [userRole, setUserRole] = useState("");
  const [open, setOpen] = useState(true);
  const roleRef = useRef(null);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const submitHandler = (event, id) => {
    event.preventDefault();
    dispatch(updateUserRole({ id, userRole, toast }));
  };

  //   useEffect(() => {
  //     setUserRole(user?.role);
  //   }, [user]);

  if (loading) {
    return (
      <>
        <div>Loading....</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>Error</div>
      </>
    );
  }
  return (
    <>
      
      <motion.div
        className="text-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="border-b border-gray-200 shadow py-8">
          <table className="divide-y divide-gray-300 w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-2 text-md text-gray-900 cursor-pointer">
                  id
                </th>

                <th className="px-6 py-2 text-md text-gray-900 cursor-pointer">
                  Name
                </th>

                <th className="px-6 py-2 text-md text-gray-900 cursor-pointer">
                  Email
                </th>

                <th className="px-6 py-2 text-md text-gray-900 cursor-pointer">
                  Type
                </th>
                <th className="px-6 py-2 text-md text-gray-900 cursor-pointer">
                  Edit
                </th>
              </tr>
            </thead>
            return (
            <tbody key={user._id} className="bg-white divide-y divide-gray-300">
              {users &&
                users?.map((user, index) => {
                  const { name, email, role } = user;
                  return (
                    <tr className="whitespace-nowrap">
                      <th className="px-6 py-2 text-md text-gray-500 cursor-pointer">
                        {index + 1}
                      </th>

                      <th className="px-6 py-2 text-md text-gray-500 cursor-pointer">
                        {name}
                      </th>

                      <th className="px-6 py-2 text-md text-gray-500 cursor-pointer">
                        {email}
                      </th>

                      <th className="px-6 py-2 text-md text-gray-500 capitalize cursor-pointer">
                        {role}
                      </th>
                      <th className="px-6 py-2 text-md text-gray-500 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <select
                            type="text"
                            id="role"
                            name="role"
                            value={userRole}
                            className="bg-transparent border-[1px] p-2 border-gray-200 text-sm"
                            onChange={(event) =>
                              setUserRole(event.target.value)
                            }
                          >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>

                          <button className="text-red cursor-pointer">
                            <AiOutlineEdit
                              onClick={(event) => prompt("Enetr role")}
                            />
                          </button>
                        </div>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
};

export default Users;
