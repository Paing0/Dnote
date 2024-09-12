import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NoteForm = ({ isCreate }) => {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-5">
        {isCreate ? "Create a new note" : "Edit your post"}
      </h1>
      <Link to={"/"}>
        <ArrowLeftIcon width={22} />
      </Link>

      <form>
        <div className="mb-3">
          <label className="font-medium block" htmlFor="title">
            Note title
          </label>
          <input
            className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            type="text"
            name="title"
            id="title"
          />
        </div>

        <div className="mb-3">
          <label className="font-medium block" htmlFor="description">
            Note description
          </label>
          <textarea
            rows={4}
            className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
            type="text"
            name="description"
            id="description"
          />
        </div>
        <button className="text-white bg-teal-600 py-3 font-medium w-full">
          Save
        </button>
      </form>
    </section>
  );
};

export default NoteForm;
