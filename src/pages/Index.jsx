import { useEffect, useState } from "react";
import Note from "../components/Note";

import { InfinitySpin } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch notes from API
  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    getNotes();
  }, []);

  const customAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
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
        </>
      ) : (
        <div className="flex items-center justify-center w-full">
          <InfinitySpin
            visible={loading}
            width="200"
            color="#0d9488"
            ariaLabel="infinity-spin-loading"
          />
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
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </section>
  );
};

export default Index;
