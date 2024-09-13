import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// import StypedErrorMessage from formik
import StyledErrorMessage from "./StyledErrorMessage";

const NoteForm = ({ isCreate }) => {
  const initialValues = {
    title: "",
    content: "",
  };

  const NoteFromSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must have at least 3 characters.")
      .max(30, "Title must not be over 30 characters.")
      .required("Title is required."),
    content: Yup.string()
      .min(3, "Content must have at least 3 characters.")
      .required("Content is required."),
  });

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create a new note" : "Edit your post"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFromSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label className="font-medium block" htmlFor="title">
                Note title
              </label>
              <Field
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                type="text"
                name="title"
                id="title"
              />
            </div>

            <StyledErrorMessage name={"title"} />

            <div className="mb-3">
              <label className="font-medium block" htmlFor="content">
                Note Content
              </label>
              <Field
                as="textarea"
                rows={4}
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                type="text"
                name="content"
                id="content"
              />
            </div>

            <StyledErrorMessage name={"content"} />

            <button
              className="text-white bg-teal-600 py-3 mt-3 font-medium w-full"
              type="submit"
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
