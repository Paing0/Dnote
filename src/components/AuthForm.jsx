import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import StyledErrorMessage from "./StyledErrorMessage";

const AuthForm = ({ isLogin }) => {
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

  const submitHandler = (values) => {
    console.log(values);
  };
  return (
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
            <label className="font-medium block" htmlFor="">
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
  );
};

export default AuthForm;
