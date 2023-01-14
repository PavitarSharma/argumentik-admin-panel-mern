import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const buttons = [
  {
    id: 1,
    name: "Dashboard",
    url: "",
  },
  {
    id: 2,
    name: "Social Link",
    url: "social-links",
  },

  {
    id: 3,
    name: "Images",
    url: "images",
  },

  {
    id: 4,
    name: "Users",
    url: "users",
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const [clickedId, setClickedId] = useState(1);
  return (
    <>
      <div className="mt-32 px-20 flex flex-col gap-20">
        <div className="">
          <div className="flex gap-10 flex-wrap">
            {buttons.map((data, index) => {
              return (
                <button
                  className={` ${
                    data.id === clickedId
                      ? "bg-yellow text-white px-4 py-3 rounded cursor-pointer active"
                      : "border-2 border-black px-4 py-3 rounded cursor-pointer"
                  }`}
                  key={data.id}
                  onClick={() => {
                    navigate(`${data.url}`);
                    setClickedId(data.id);
                  }}
                >
                  {data.name}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
