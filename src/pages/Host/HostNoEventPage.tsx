import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import EmptyScreen from "components/Design/EmptyScreen/EmptyScreen";
import { useAppDispatch } from "hooks/useAppDispatch";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import EventEmpty from "static/Image/EventEmpty.png";
import { useGetAllEevntsQuery } from "store/api/hostEvent";
import { setCurrentEventId } from "store/slices/currentEvent";

const HostNoEventPage = () => {
  useDocumentTitle("Getogether");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data = [], isSuccess, isLoading } = useGetAllEevntsQuery();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (isSuccess && data.length > 0) {
      dispatch(setCurrentEventId(data[0].uuid));
    }
  }, [isSuccess]);

  if (isSuccess && data.length > 0) {
    return <Navigate to={`/host/${data[0].uuid}/home`} />;
  }

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
