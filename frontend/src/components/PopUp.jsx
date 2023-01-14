import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { createPopupMessage } from "../redux/slice/contentSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
const PopUp = ({ setPopup }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  // const form = useRef();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      contact: contact,
    };
    const action = createPopupMessage(data);
    toast.success("Content saved successfully.");
    dispatch(action);
  };

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_s0qrjue",
  //       "template_45c6q1u",
  //       form.current,
  //       "VoY-CbYP3oBcG0P3K"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );

  //     dispatch(createPopupMessage())
  // };
  return (
    <div className="fixed top-12 lg:translate-x-[25%] md:translate-x-[20%]   z-50  w-full">
      <div>
        <form
          // ref={form}

          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            maxWidth: "580px",
            width: "100%",
            backgroundColor: "white",
            padding: "40px 24px",
            borderRadius: "10px",
            margin: "40px 0",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Name"
            className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded text-dark-fade"
          />
          <input
            id="contact"
            type="TEXT"
            name="contact"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            placeholder="Enter Contact"
            className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded text-dark-fade"
          />

          <div className="flex items-center gap-4">
            <button
              onClick={handleOnSubmit}
              className="bg-blue px-6 rounded cursor-pointer py-2"
            >
              Submit
            </button>
            <button
              onClick={() => setPopup(false)}
              className="bg-orange-600 px-6 rounded cursor-pointer py-2"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
