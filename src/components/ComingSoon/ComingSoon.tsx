import Loader from "components/Design/Loader/Loader";

const ComingSoon = () => {
  return (
    <section className="flex items-center w-full justify-center flex-col gap-2">
      <div className="flex justify-center items-center gap-2">
        <Loader loop={false} />
        <h4 className="text-red-600 font-bold text-h4">Getogether</h4>
      </div>
      <h4 className="text-h5-bold">Coming soon</h4>
    </section>
  );
};

export default ComingSoon;
