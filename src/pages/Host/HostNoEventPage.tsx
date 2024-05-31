import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import EmptyScreen from "components/Design/EmptyScreen/EmptyScreen";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import EventEmpty from "static/Image/EventEmpty.png";

const HostNoEventPage = () => {
  useDocumentTitle("Getogether");
  const navigate = useNavigate();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatedPage
      variants={sectionVariants}
      className="flex items-center w-full justify-center flex-col gap-2 pt-8 pr-[18px] pl-10"
    >
      <EmptyScreen
        img={EventEmpty}
        title="Get Started"
        subtitle="Start by adding your first event."
        actionText=" Create Event"
        onClick={() => navigate("/create-event")}
      />
    </AnimatedPage>
  );
};

export default HostNoEventPage;
