import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import StyledErrorMessage from "./StyledErrorMessage";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});

  const { id } = useParams();

  const getoldNotes = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`);

    if (response.status === 200) {
      const note = await response.json();
      setOldNote(note);
    } else {
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      getoldNotes();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    note_id: isCreate ? "" : oldNote._id,
  };

  // Define validation schema using Yup
  const NoteFromSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must have at least 3 characters.")
      .max(100, "Title must not be over 100 characters.")
      .required("Title is required."),
    content: Yup.string()
      .min(3, "Content must have at least 3 characters.")
      .required("Content is required."),
  });

  // Handle form submission
  const submitHandler = async (values) => {
    const API = isCreate
      ? `${import.meta.env.VITE_API}/create`
      : `${import.meta.env.VITE_API}/edit`;
    const method = isCreate ? "POST" : "PATCH";
    const alertMessage = isCreate
      ? "Failed to create the note. Try again!"
      : "Failed to update the note. Try again!";
    const statusCode = isCreate ? 201 : 200;

    const response = await fetch(API, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    // handle different statusCode
    if (response.status === statusCode) {
      setRedirect(true);
    } else {
      toast.error(alertMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // Redirect after successful form submission
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create a new note" : "Edit your post"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>

      {/* Formik for form handling and validation */}
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFromSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label className="font-medium block" htmlFor="title">
                Note title
              </label>
              {/* Field component to bind formik field */}
              <Field
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                type="text"
                name="title"
                id="title"
              />
            </div>

            {/* Display validation errors */}
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

            <Field type="text" name="note_id" id="note_id" hidden />

            <button
              className="text-white bg-teal-600 py-3 mt-3 font-medium w-full"
              type="submit"
            >
              {isCreate ? "Save" : "Update Note"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
