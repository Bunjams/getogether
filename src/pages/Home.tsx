import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Button from "components/Design/Button/Button";
import useDocumentTitle from "hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import EventEmpty from "static/Image/EventEmpty.png";

const Home = () => {
  useDocumentTitle("Getogether");
  const sectionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <AnimatedPage
      variants={sectionVariants}
      className="flex items-center w-full justify-center flex-col gap-2"
    >
      <img
        src={EventEmpty}
        className="rounded-3xl overflow-hidden w-72 h-56"
        loading="lazy"
      />
      <h4 className="text-h4 font-semibold text-neutral-900">Get Started</h4>
      <p className="text-body-regular text-neutral-900">
        Start by adding your first event.
      </p>
      <Link to="/create-event">
        <Button type="primary" size="large">
          Create Event
        </Button>
      </Link>
    </AnimatedPage>
  );
};

export default Home;
