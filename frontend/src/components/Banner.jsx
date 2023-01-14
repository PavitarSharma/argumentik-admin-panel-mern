import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import SocialMediaIcons from "./SocialMediaIcons";
import { AiOutlineApple } from "react-icons/ai"
const Banner = () => {
  const isAboveSmallScreens = useMediaQuery("(min-width: 760px)");
  return (
    <div id="home" className="pt-32 pb-20 px-20">
      <div className="flex items-center gap-10 sm:justify-between">
        <p className="md:text-[100px] sm:text-[80px] text-2xl">Home</p>
        <div className="flex flex-col">
          <p className="md:text-md text-sm">
            Online platform for modern <br /> home renovation
          </p>
          <div className="h-[2px] bg-white"></div>
        </div>
        <p className="md:text-[100px] sm:text-[80px] text-2xl">Now</p>
      </div>
      <div className="relative sm:flex items-center sm:justify-between  justify-center h-full gap-16 mt-14">
        <div className="bg-green-700 rotate-[-20deg] w-28 h-20 px-2 rounded-full flex items-center justify-center sm:static absolute right-0">
          <p className="text-sm">JOIN AS <br /> A PRO</p>
        </div>

        <div>
            <p className="sm:text-5xl text-xl">Start <br /> Building <br /> Your <br /> Comfort</p>
        </div>
        <div className="">
          {isAboveSmallScreens ? (
            <div className="rotate-[-20deg]">
              <img
                alt="profile"
                className=" hover:filter hover:saturate-200 transition duration-500  w-full max-w-[80px] md:max-w-[80px]"
                src="images/profile-image.png"
              />
              <p className="text-sm ">
                Our <br /> Designers
              </p>
            </div>
          ) : (
            <div className="rotate-[-20deg] ">
              <img
                alt="profile"
                className=" hover:filter hover:saturate-200 transition duration-500  w-full max-w-[80px] md:max-w-[80px]"
                src="images/profile-image.png"
              />
              <p className="text-sm ">
                Our <br /> Designers
              </p>
            </div>
          )}
        </div>
        {/* MAIN TEXT */}
      </div>

      <div>
        
      </div>
      <div className="z-30 basis-2/5 mt-32">
        {/* HEADINGS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          className="flex sm:flex-row flex-col justify-between gap-20"
        >
        <div className=" h-[140px] w-[100%]">
            <img src="images/room.jpg" alt="room" className="w-full h-full object-cover rounded-full" />
        </div>

        <div className="w-[100%] border border-white flex items-center justify-center rounded-full text-[100px]">
            <AiOutlineApple />
        </div>
          
        </motion.div>

        <motion.div
          className="flex mt-12 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
    
        >
          <SocialMediaIcons />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
