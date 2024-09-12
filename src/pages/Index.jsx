import Note from "../components/Note";
import Plus from "../components/Plus";

const Index = () => {
  return (
    <section className="flex gap-6 flex-wrap px-10 mt-10">
      <Note />
      <Note />
      <Note />
      <Note />
      <Plus />
    </section>
  );
};

export default Index;
