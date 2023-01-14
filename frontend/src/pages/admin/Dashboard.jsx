import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ReactToPdf from "react-to-pdf";

import { useDispatch, useSelector } from "react-redux";
import { getAllPopupMessages } from "../../redux/slice/contentSlice";
const Dashboard = () => {
  const ref = React.createRef();
  const dispatch = useDispatch();
  const { loading, error, popupDatas } = useSelector((state) => state.contents);

  useEffect(() => {
    dispatch(getAllPopupMessages());
  }, [dispatch]);

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
      <div className="my-10">
        <ReactToPdf
          targetRef={ref}
          filename="admin-data.pdf"
        
          x={0.5}
          y={0.5}
          scale={0.5}
        >
          {({ toPdf }) => (
            <button
              className="border-2 py-3 px-4 rounded cursor-pointer hover:bg-yellow transition-all duration-500 hover:text-white hover:border-none border-black"
              onClick={toPdf}
            >
              Generate pdf
            </button>
          )}
        </ReactToPdf>
      </div>
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
          <table className="divide-y divide-gray-300 w-full" ref={ref}>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-2 text-md text-gray-900 cursor-pointer">
                  id
                </th>

                <th className="px-6 py-2 text-md text-gray-900 cursor-pointer">
                  Name
                </th>

                <th className="px-6 py-2 text-md text-gray-900 cursor-pointer">
                  Contact
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-300">
              {popupDatas &&
                popupDatas?.map((data, index) => {
                  const { name, contact } = data;
                  return (
                    <tr className="whitespace-nowrap" key={data._id}>
                      <th className="px-6 py-2 text-md text-gray-500 cursor-pointer">
                        {index + 1}
                      </th>

                      <th className="px-6 py-2 text-md text-gray-500 cursor-pointer">
                        {name}
                      </th>

                      <th className="px-6 py-2 text-md text-gray-500 cursor-pointer">
                        {contact}
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

export default Dashboard;
