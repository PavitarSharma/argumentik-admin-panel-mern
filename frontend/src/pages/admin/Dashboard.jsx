import { useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";
import { getAllUser } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  console.log(users);
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
        <div className="flex items-center border-gray-500 border-2 p-4 rounded justify-between max-w-[900px] w-[100%]">
          <p>Name1</p>
          <p>Contact</p>
          <button>
            <AiOutlineEdit />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
