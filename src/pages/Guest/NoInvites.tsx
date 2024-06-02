import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import EmptyScreen from "components/Design/EmptyScreen/EmptyScreen";
import { useAppDispatch } from "hooks/useAppDispatch";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventEmpty from "static/Image/EventEmpty.png";
import { useGetAllEventForGuestQuery } from "store/api/guest";
import { setCurrentEventId } from "store/slices/currentEvent";

const NoInvites = () => {
  useDocumentTitle("Getogether");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data = [], isSuccess } = useGetAllEventForGuestQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (isSuccess && data.length > 0) {
      dispatch(setCurrentEventId(data[0].uuid));
      navigate(`/guest/${data[0].uuid}/home`);
    }
  }, [isSuccess, JSON.stringify(data)]);

  return (
    <AnimatedPage
      variants={sectionVariants}
      className="flex items-center w-full justify-center flex-col gap-2 pt-8 pr-[18px] pl-10"
    >
      {/* TODO: fix this copy */}
      <EmptyScreen
        img={EventEmpty}
        title="No Invitaion yet!"
        subtitle=""
        noAction
      />
    </AnimatedPage>
  );
};

export default NoInvites;
