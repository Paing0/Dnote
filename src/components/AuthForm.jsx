import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import StyledErrorMessage from "./StyledErrorMessage";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = ({ isLogin }) => {
  const [redirect, setRedirect] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // Define validation schema using Yup
  const AuthFormSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must have at least 3 characters.")
      .max(10, "Username must not be over 10 characters")
      .required("Username is required."),
    email: Yup.string()
      .required("Email is required!")
      .email("Please enter an vaild email!"),
    password: Yup.string()
      .min(4, "Password must have at least 4 characters.")
      .required("Password is required!"),
  });

  const submitHandler = async (values) => {
    const { username, email, password } = values;

    if (isLogin) {
      //
    } else {
      const response = await fetch(`${import.meta.env.VITE_API}/register`, {
        body: JSON.stringify({ username, email, password }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setRedirect(true);
      } else if (response.status === 400) {
        const data = await response.json();
        const errorMessage = data.errorMessages[0].msg;

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        transition:Bounce
      />
      <Formik
        initialValues={initialValues}
        validationSchema={AuthFormSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form className="w-1/2 mx-auto">
            <h1 className="text-center font-bold text-4xl text-teal-600">
              {isLogin ? "Login" : "Register"}
            </h1>
            {!isLogin && (
              <div className="mb-3">
                <label className="font-medium block" htmlFor="username">
                  Username
                </label>
                {/* Field component to bind formik field */}
                <Field
                  className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                  type="text"
                  name="username"
                  id="username"
                />

                {/* Display validation errors */}
                <StyledErrorMessage name={"username"} />
              </div>
            )}

            <div className="mb-3">
              <label className="font-medium block" htmlFor="email">
                Email
              </label>
              {/* Field component to bind formik field */}
              <Field
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                type="email"
                name="email"
                id="email"
              />

              {/* Display validation errors */}
              <StyledErrorMessage name={"email"} />
            </div>

            <div className="mb-3">
              <label className="font-medium block" htmlFor="password">
                Password
              </label>
              {/* Field component to bind formik field */}
              <Field
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                type="password"
                name="password"
                id="password"
              />

              {/* Display validation errors */}
              <StyledErrorMessage name={"password"} />
            </div>

            <button
              className="text-white bg-teal-600 py-3 font-medium w-full rounded-lg"
              type="submit"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
