import React from "react";
import { motion } from "framer-motion";
import LineGradient from "../../components/LineGradient";
import Testimonials from "./Testimonials";
import Lifestyles from "./Lifestyles";
import Boutiques from "./Boutiques";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";

const Home = ({ setSelectedPage, selectedPage }) => {
  return (
    <>
      <div className="bg-dark-fade text-white w-full">
        <Banner selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </div>
      <div className="w-5/6 mx-auto md:h-full">
        <motion.div
          margin="0 0 -200px 0"
          amount="all"
          // onViewportEnter={() => setSelectedPage("aboutus")}
        >
          <Testimonials />
        </motion.div>
      </div>
      <div className="w-5/6 mx-auto md:h-full">
        <motion.div
          margin="0 0 -200px 0"
          amount="all"
          // onViewportEnter={() => setSelectedPage("lifestyle")}
        >
          <Lifestyles />
        </motion.div>
      </div>
      <div className="w-5/6 mx-auto md:h-full">
        <motion.div
          margin="0 0 -200px 0"
          amount="all"
          // onViewportEnter={() => setSelectedPage("boutiques-and-staff")}
        >
          <Boutiques />
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
