import SocialMediaIcons from "./SocialMediaIcons";
import { motion } from "framer-motion";


const Footer = () => {

  return (
    <>
      <footer className="bg-dark-fade text-white w-full">
       
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
      </footer>
    </>
  );
};

export default Footer;
