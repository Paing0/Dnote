import { CalendarDaysIcon, UserIcon } from "@heroicons/react/24/solid";
import { formatISO9075 } from "date-fns/formatISO9075";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();

  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch notes from API
  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
    const note = await response.json();
    setNote(note);
    setLoading(false);
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    getNote();
  }, []);

  return (
    <>
      {!loading ? (
        <section className="px-10 mt-10">
          <div className="text-right">
            <Link
              className="text-teal-600 font-medium border-2 border-teal-600 px-3 py-2"
              to={"/"}
            >
              Back
            </Link>
          </div>
          <h3 className="text-3xl font-medium">{note.title}</h3>
          <div className="border-t-4 border-t-teal-600 shadow-xl p-3 mt-4">
            <div className="flex gap-4">
              <p className="flex items-center gap-2 font-medium text-gray-600">
                <UserIcon className="w-5 h-5" /> {note.author}
              </p>
              {note.createdAt && (
                <p className="flex items-center gap-2 font-medium text-gray-600">
                  <CalendarDaysIcon className="w-5 h-5" />
                  {formatISO9075(new Date(note.createdAt), {
                    representation: "date",
                  })}
                </p>
              )}
            </div>
            <p className="text-base mt-2">{note.content}</p>
          </div>
        </section>
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
    </>
  );
};

export default Details;
