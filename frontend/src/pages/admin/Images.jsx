import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createContent } from "../../redux/slice/contentSlice";

const validate = Yup.object({
  image: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter image url!"
    )
    .required("Image field is required!"),
  content: Yup.string()
    .min(8, "Must be 8 chracters or more")
    .required("Content field is required!"),
});

const Images = () => {
  const dispatch = useDispatch();

  const { loading, error, success, message } = useSelector(
    (state) => state.contents
  );
  const handleOnSubmit = (data) => {
    const action = createContent(data);
    toast.success("Content saved successfully.");
    dispatch(action);
  };
  return (
    <div>
      <Formik
        initialValues={{
          image: "",
          content: "",
        }}
        validationSchema={validate}
        onSubmit={handleOnSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form
            className="flex flex-col gap-8 max-w-[400px] w-[100%0 bg-white] rounded py-[20px] px-[24px] mt-10 shadow-xl"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                id="image"
                type="url"
                name="image"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.image}
                placeholder="Add Image"
                className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
              />
              <p className="text-orange-600 ml-2 mt-2">
                {errors.image && touched.image && errors.image}
              </p>
            </div>

            <div>
              <textarea
                id="content"
                type="string"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                rows="4"
                value={values.content}
                placeholder="Add uour content"
                className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
              />
              <p className="text-orange-600 ml-2 mt-2">
                {errors.content && touched.content && errors.content}
              </p>
            </div>

            <button
              className="bg-blue py-[10px] text-white font-semibold text-lg cursor-pointer rounded"
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Images;
