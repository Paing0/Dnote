import { Link } from "react-router-dom";

const Details = () => {
  return (
    <section className="px-10 mt-10">
      <div className="text-right">
        <Link
          className="text-teal-600 font-medium border-2 border-teal-600 px-3 py-2"
          to={"/"}
        >
          Back
        </Link>
      </div>
      <div className="border-t-4 border-t-teal-600 shadow-xl p-3 mt-4">
        <h3 className="text-3xl font-medium">Lorem Ipsum, dolor sit amet.</h3>
        <p className="text-base mt-2">
          Lorem Ipsum, dolor sit amet.Lorem Ipsum, dolor sit amet.Lorem Ipsum,
          dolor sit amet.
        </p>
      </div>
    </section>
  );
};

export default Details;
