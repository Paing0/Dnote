import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Note = () => {
  return (
    <div className="w-2/5 border-t-4 border-t-teal-600 shadow-xl p-3">
      <h3 className="text-xl font-medium">Lorem Ipsum, dolor sit amet.</h3>
      <p className="text-sm mt-2">
        Lorem Ipsum, dolor sit amet.Lorem Ipsum, dolor sit amet.Lorem Ipsum,
        dolor sit amet.
      </p>
      <div className="flex items-center justify-end  gap-2">
        <TrashIcon className="text-red-600" width={20} />
        <Link to={"/edit/1"}>
          <PencilSquareIcon className="text-teal-600" width={20} />
        </Link>

        <Link to={"/notes/1"}>
          <EyeIcon className="text-gray-600" width={20} />
        </Link>
      </div>
    </div>
  );
};

export default Note;
