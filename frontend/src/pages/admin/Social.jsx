import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validate = Yup.object({
  facebookLink: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter facebook url!"
    )
    .required("facebook url field is required!"),
  instagramLink: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter instagram url!"
    )
    .required("Instagram url field is required!"),

    linkedinLink: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter linkedin url!"
    )
    .required("Linkedin url field is required!"),
});

const Social = () => {
  const handleOnSubmit = async (values, actions) => {
    const response = await axios.post(
      "https://argumentik-abckend.onrender.com/user/register",
      { values }
    );
    const data = await response.data;
    console.log(data);
    actions.setSubmitting(false);
    actions.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
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
                id="facebookLink"
                type="url"
                name="facebookLink"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.facebookLink}
                placeholder="Facebook Url"
                className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
              />
              <p className="text-orange-600 ml-2 mt-2">
                {errors.facebookLink &&
                  touched.facebookLink &&
                  errors.facebookLink}
              </p>
            </div>
            <div className="form-control">
              <input
                id="instagramLink"
                type="url"
                name="instagramLink"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.instagramLink}
                placeholder="Instagram Url"
                className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
              />
              <p className="text-orange-600 ml-2 mt-2">
                {errors.instagramLink &&
                  touched.instagramLink &&
                  errors.instagramLink}
              </p>
            </div>

            <div>
              <input
                id="linkedinLink"
                type="url"
                name="linkedinLink"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.linkedinLink}
                placeholder="Linkedin Url"
                className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
              />
              <p className="text-orange-600 ml-2 mt-2">
                {errors.linkedinLink &&
                  touched.linkedinLink &&
                  errors.linkedinLink}
              </p>
            </div>

            <button className="bg-blue py-[10px] text-white font-semibold text-lg cursor-pointer rounded" type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Social;
