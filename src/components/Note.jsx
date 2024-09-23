import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

import formatISO9075 from "date-fns/formatISO9075";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Note = ({ note, getNotes, customAlert }) => {
  const { _id, title, content, createdAt } = note;
  const { token } = useContext(UserContext);

  const deleteNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (response.status === 204) {
      customAlert("Note Deleted", 204);
      getNotes();
    } else {
      customAlert("Auth Failed", 401);
    }
  };

  return (
    <div className="w-2/5 h-fit border-t-4 border-t-teal-600 shadow-xl p-3">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-sm mt-2 break-words">{content.slice(0, 120)}</p>
      <div className="flex items-center justify-between mt-2 border-t pt-2">
        <p className="text-sm font-medium">
          <CalendarDaysIcon className="w-5 h-5 inline mr-2" />
          {formatISO9075(new Date(createdAt), { representation: "date" })}
        </p>

        <div className="flex items-center justify-end gap-2">
          {token && note.author.toString() === token.userId && (
            <>
              {}
              <TrashIcon
                className="text-red-600 cursor-pointer"
                width={20}
                onClick={deleteNote}
              />
              <Link to={"/edit/" + _id}>
                <PencilSquareIcon className="text-teal-600" width={20} />
              </Link>
            </>
          )}
          <Link to={"/notes/" + _id}>
            <EyeIcon className="text-gray-600" width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
