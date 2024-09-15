import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import formatISO9075 from "date-fns/formatISO9075";
import { Link } from "react-router-dom";

const Note = ({ note }) => {
  const { _id, title, content, createdAt } = note;

  return (
    <div className="w-2/5 h-fit border-t-4 border-t-teal-600 shadow-xl p-3">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-sm mt-2">{content.slice(0, 120)}</p>
      <div className="flex items-center justify-between mt-2 border-t pt-2">
        <p className="txt-sm font-medium">
          {formatISO9075(new Date(createdAt), { representation: "date" })}
        </p>

        <div className="flex items-center justify-end gap-2">
          <TrashIcon className="text-red-600" width={20} />
          <Link to={"/edit/" + _id}>
            <PencilSquareIcon className="text-teal-600" width={20} />
          </Link>

          <Link to={"/notes/" + _id}>
            <EyeIcon className="text-gray-600" width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
