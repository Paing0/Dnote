import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Note from "../components/Note";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch notes from API
  const getNotes = async (pageNum) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNum}`,
    );
    const { notes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setLoading(false);
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    getNotes(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const customAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <section className="flex justify-center gap-6 flex-wrap px-10 mt-10">
      {!loading && notes.length > 0 ? (
        <>
          {/* Map through notes and send each note to the Note component */}
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              getNotes={getNotes}
              customAlert={customAlert}
            />
          ))}
          <div className="w-full flex items-center justify-center gap-3">
            {currentPage > 1 && (
              <button
                className="text-white text-lg font-medium bg-teal-600 px-3 py-1"
                type="button"
                onClick={handlePrevious}
              >
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button
                className="text-white text-lg font-medium bg-teal-600 px-3 py-1"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full">
          <TailSpin
            visible={loading}
            width="200"
            color="#0d9488"
            ariaLabel="tailspin-spin-loading"
          />

          {!loading && notes.length === 0 && (
            <p>No notes have been created yet.</p>
          )}
        </div>
      )}
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
    </section>
  );
};

export default Index;
