import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import StyledErrorMessage from "./StyledErrorMessage";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const fileRef = useRef();

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
    cover_image: isCreate ? null : oldNote.cover_image,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

  // Define validation schema using Yup
  const NoteFromSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must have at least 3 characters.")
      .max(100, "Title must not be over 100 characters.")
      .required("Title is required."),
    content: Yup.string()
      .min(3, "Content must have at least 3 characters.")
      .required("Content is required."),
    cover_image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not supported.",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type),
      ),
  });

  // Handle image change
  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  // clear PreviewImage
  const clearPreviewImage = (setFieldValue) => {
    setPreviewImage(null);
    setFieldValue("cover_image", null);
    if (isCreate) {
      fileRef.current.value = "";
    }
  };

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

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);

    const response = await fetch(API, {
      method,
      body: formData,
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
        {({ setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div className="mb-3">
              <label className="font-medium block" htmlFor="title">
                Note Title
              </label>
              {/* Field component to bind formik field */}
              <Field
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                type="text"
                name="title"
                id="title"
              />

              {/* Display validation errors */}
              <StyledErrorMessage name={"title"} />
            </div>

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

              <StyledErrorMessage name={"content"} />
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between">
                <label className="font-medium block" htmlFor="cover">
                  Cover Image{" "}
                  <span className="text-xs font-medium">(optional)</span>
                </label>
                {previewImage && (
                  <p
                    className="text-base font-medium text-teal-600 cursor-pointer"
                    onClick={() => {
                      clearPreviewImage(setFieldValue);
                    }}
                  >
                    Clear
                  </p>
                )}
              </div>

              {isUpload ? (
                <p
                  className="text-base font-medium text-teal-600 cursor-pointer"
                  onClick={() => setIsUpload(false)}
                >
                  Hide cover image
                </p>
              ) : (
                <p
                  className="text-base font-medium text-teal-600 cursor-pointer"
                  onClick={() => setIsUpload(true)}
                >
                  Upload cover image
                </p>
              )}
              {isUpload && (
                <>
                  <input
                    type="file"
                    name="cover_image"
                    hidden
                    ref={fileRef}
                    onChange={(e) => {
                      handleImageChange(e, setFieldValue);
                    }}
                  />
                  <div
                    className="border-2 border-teal-600 flex items-center justify-center text-teal-600 border-dashed h-60 cursor-pointer rounded-lg relative overflow-hidden"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <ArrowUpTrayIcon className="z-20" width={30} height={30} />
                    {isCreate ? (
                      <>
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt="Preview Image"
                            className="w-full absolute top-0 left-0 h-full object-cover opacity-80 z-10"
                          />
                        )}
                      </>
                    ) : (
                      <img
                        src={
                          previewImage
                            ? previewImage
                            : `${import.meta.env.VITE_API}/${oldNote.cover_image}`
                        }
                        alt="Preview Image"
                        className="w-full absolute top-0 left-0 h-full object-cover opacity-80 z-10"
                      />
                    )}
                  </div>
                </>
              )}

              <StyledErrorMessage name={"cover_image"} />
            </div>

            <button
              className="text-white bg-teal-600 py-3 font-medium w-full"
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
