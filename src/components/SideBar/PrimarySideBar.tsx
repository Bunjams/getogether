import { Avatar, Divider, Tooltip } from "antd";
import classNames from "classnames";
import Profile from "components/Profile/Profile";
import RoleSwitcher from "components/RoleSwitcher/RoleSwitcher";
import { EVENT_IMG_LINK } from "dictionaries";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useCurrentUser } from "hooks/useCurrentUser";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllEventForGuestQuery } from "store/api/guest";
import { useGetAllEevntsQuery } from "store/api/hostEvent";
import { setCurrentEventId } from "store/slices/currentEvent";
import { EventResult } from "types/model/event";

const EventList = ({
  eventList: data,
  isSuccess,
}: {
  eventList: EventResult[];
  isSuccess: boolean;
}) => {
  const { role } = useCurrentUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { eventId: currentEventId } = useAppSelector(
    (state) => state.currerntEvent
  );

  const noEvents = data.length === 0;

  useEffect(() => {
    if (isSuccess && data.length > 0) {
      dispatch(setCurrentEventId(data[0].uuid));
    }
  }, [isSuccess]);

  const onClick = ({ uuid }: { uuid: string }) => {
    dispatch(setCurrentEventId(uuid));
    if (role === "HOST") {
      navigate(`/host/${uuid}/home`, {});
      return;
    }
    if (role === "GUEST") {
      navigate(`/guest/${uuid}/home`, {});
      return;
    }
  };

  if (!isSuccess) {
    return null;
  }

  if (noEvents) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      {data?.map(({ uuid, type, name }) => (
        <button
          key={uuid}
          onClick={() => onClick({ uuid })}
          className="flex items-center gap-2 cursor-pointe focus-visible:scale-125 hover:scale-125 transform transition duration-300 ease-in-out"
        >
          <Tooltip placement="right" title={name}>
            <Avatar
              src={EVENT_IMG_LINK[type as keyof typeof EVENT_IMG_LINK]}
              className={classNames("h-10 w-10", {
                "!border-green-100 !border-solid !border-4":
                  currentEventId === uuid,
              })}
            />
          </Tooltip>
        </button>
      ))}
    </div>
  );
};

const HostEventList = () => {
  const { data = [], isSuccess } = useGetAllEevntsQuery();
  return (
    <>
      <EventList eventList={data} isSuccess={isSuccess} />
      <Link
        to="/create-event"
        className="text-red-400 bg-whitebase rounded-full flex items-center justify-center h-10 w-10 sticky bottom-12"
      >
        <Tooltip placement="right" title="Create event">
          <Plus size={40} strokeWidth={1.5} color="currentColor" />
        </Tooltip>
      </Link>
    </>
  );
};

const GuestEventList = () => {
  const { data = [], isSuccess } = useGetAllEventForGuestQuery();
  return <EventList eventList={data} isSuccess={isSuccess} />;
};

const EventListSection = () => {
  const { role } = useCurrentUser();

  switch (role) {
    case "HOST":
      return <HostEventList />;
    case "GUEST":
      return <GuestEventList />;

    case "HOST":
      return null;

    default:
      return null;
  }
};

const PrimarySideBar = () => {
  const { role } = useCurrentUser();

  const sectionVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  return (
    <nav className="shrink-0 bg-red-400 pr-3 pl-1  items-center  flex flex-col justify-between z-primary-sideBar overflow-y-auto">
      <div>
        <div className="sticky top-0 z-10">
          <RoleSwitcher />
        </div>
        <AnimatePresence>
          {role !== "VENDOR" && (
            <motion.div
              className="flex flex-col items-center gap-4 pb-2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              transition={{ duration: 0.3 }}
            >
              <Divider
                className="mt-4 mb-1 bg-whitebase"
                style={{ height: "2px" }}
              />
              <EventListSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0">
        <Profile />
      </div>
    </nav>
  );
};

export default PrimarySideBar;
