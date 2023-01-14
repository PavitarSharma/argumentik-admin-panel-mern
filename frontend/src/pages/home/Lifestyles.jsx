import { motion } from "framer-motion";
import LineGradient from "../../components/LineGradient";

const Lifestyles = () => {
  return (
    <section id="lifestyle" className="pt-32 pb-16">
      <motion.div
        className="md:w-1/3 text-center md:text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <p className="font-playfair font-semibold text-4xl mb-5 text-red">
          Life styles
        </p>
        <LineGradient width="mx-auto w-2/5" />
        <p className="mt-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At nobis quos
          velit sit saepe eius molestias repellat asperiores error, praesentium
          quam corrupti. Repellat facere laboriosam optio, architecto eius a
          corporis?
        </p>
      </motion.div>
    </section>
  );
};

export default Lifestyles;
