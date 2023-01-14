import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/slice/userSlice";

const validate = Yup.object({
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, message } = useSelector(
    (state) => state.users
  );

  const handleOnSubmit = (data) => {
    dispatch(signIn(data));
    
    if(success) {
      navigate("/");
      toast.success("Successfully Logged In.");
    }else {
      toast.error("Please true again!")
    }
  };

 
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Formik
        initialValues={{
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
            <p className="text-center mt-10 text-4xl font-semibold">Login</p>

            <div>
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
              Login
            </button>
            <div className="flex items-center justify-center gap-1">
              <p>Don't have account?</p>
              <Link
                to="/signUp"
                className="font-semibold text-orange-600 cursor-pointer text-lg"
              >
                Sign Up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
