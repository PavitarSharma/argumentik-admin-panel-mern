import { motion } from "framer-motion";
import { useEffect } from "react";
import LineGradient from "../../components/LineGradient";
import { useDispatch, useSelector } from "react-redux";
import { getAllContent } from "../../redux/slice/contentSlice";
const Lifestyles = () => {
  const dispatch = useDispatch();
  const { loading, error, contents } = useSelector((state) => state.contents);

  useEffect(() => {
    dispatch(getAllContent());
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
        <div className="flex md:flex-row flex-col items-center  gap-4 mt-6">
          {contents &&
            contents?.map((content) => {
              return (
                <div key={content._id} className="relative ">
                  <div className="w-[400px]">
                    <img
                      src={content.image}
                      alt="image"
                      className="object-contain  w-full rounded"
                    />
                  </div>

                  <p className="absolute w-[350px] text-start bottom-2 px-3 pb-2 text-white text-lg">
                    {content.content.length > 30
                      ? content.content.substring(0, 80) + "..."
                      : content.content}
                  </p>
                </div>
              );
            })}
        </div>
      </motion.div>
    </section>
  );
};

export default Lifestyles;
