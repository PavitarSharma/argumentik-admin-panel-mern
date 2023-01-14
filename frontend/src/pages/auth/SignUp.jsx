import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../../redux/slice/userSlice";

const validate = Yup.object({
  name: Yup.string()
    .min(2, "Must be 2 chracters or more")
    .max(15, "Must be 15 chracters or less")
    .required("Username field is required!"),
  email: Yup.string()
    .email("Email is Invalid")
    .required("Email field is required!"),

  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "password should contain atleast one number and one special character"
    )
    .required("Passowrd field is required!"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, message } = useSelector(
    (state) => state.users
  );
  const handleOnSubmit = (data) => {
    const action = register(data);
    dispatch(action);
    toast.success("Successfully regstered.");
    if (success) {
      navigate("/");
    }else {
      toast.error("Please true again!");
    }
  };

 

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Formik
        initialValues={{
          name: "",
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
            className="form"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              maxWidth: "580px",
              width: "100%",
              backgroundColor: "white",
              padding: "20px 24px",
              borderRadius: "10px",
              margin: "40px 0",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <p className="text-center mt-10 text-4xl font-semibold">Sign Up</p>
            <div>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Enter name"
                className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
              />
              <p className="text-orange-600 ml-2 mt-2">
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            <div className="form-control">
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter email"
                className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
              />
              <p className="text-orange-600 ml-2 mt-2">
                {errors.email && touched.email && errors.email}
              </p>
            </div>

            <div>
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter password"
                className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
              />
              <p className="text-orange-600 ml-2 mt-2">
                {errors.password && touched.password && errors.password}
              </p>
            </div>

            <button
              className="py-[10px] text-white font-semibold text-lg cursor-pointer rounded"
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: "blue" }}
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center gap-1">
              <p>Already have an account.</p>
              <Link
                to="/login"
                className="font-semibold text-orange-600 cursor-pointer text-lg"
              >
                Sign In
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
