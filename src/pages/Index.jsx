import { useState, useEffect } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";
import { InfinitySpin } from "react-loader-spinner";

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

  return (
    <section className="flex gap-6 flex-wrap px-10 mt-10">
      {!loading && notes.length > 0 ? (
        <>
          {/* Map through notes and send each note to the Note component */}
          {notes.map((note) => (
            <Note key={note._id} note={note} />
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
      <Plus />
    </section>
  );
};

export default Index;
