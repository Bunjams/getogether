import { Avatar } from "antd";
import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import PageLayout from "components/Design/PageLayout/PageLayout";
import dayjs from "dayjs";
import { EVENT_IMG_LINK } from "dictionaries";
import { motion } from "framer-motion";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useModal } from "hooks/useModal";
import { useRandomProfile } from "hooks/useRandomProfile";
import { CalendarHeart, Map, UsersRound } from "lucide-react";
import { memo, ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  useGetEventByIdQuery,
  useGetEventTeamQuery,
} from "store/api/hostEvent";
import InviteCoHost from "./InviteCoHost";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const DetailsItem = ({
  icon,
  title,
  subtitle,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  icon: ReactNode;
}) => {
  return (
    <motion.div
      className="flex gap-2 items-center bg-whitebase rounded-lg p-3"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
    >
      {icon}
      <div>
        <div className="text-h4 text-neutral-900">{title}</div>
        <div className="text-body-regular text-neutral-500">{subtitle}</div>
      </div>
    </motion.div>
  );
};

const Cohost = ({
  icon,
  title,
  email,
  index,
}: {
  title: ReactNode;
  email: ReactNode;
  icon: ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      className="flex gap-3 items-center bg-whitebase rounded-lg p-3"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: index + 1 * 0.5 }}
    >
      {icon}
      <div>
        <div className="text-h5-medium text-neutral-900">{title}</div>
        <div className="text-footnote text-neutral-500">{email}</div>
      </div>
    </motion.div>
  );
};

const MapCard = () => {
  return (
    <div className="h-96 rounded-lg border-neutral-100 bg-whitebase shadow-button-secondary p-6 flex gap-3 flex-col">
      <iframe
        src="https://www.google.com/maps/@12.918057,77.6167088,16z?entry=ttu"
        className="h-full"
      />
    </div>
  );
};

const TeamList = () => {
  const { eventId = "" } = useParams<{ eventId: string }>();
  const profileUrl = useRandomProfile();

  const { data: coHost } = useGetEventTeamQuery(
    { eventId },
    { skip: !eventId }
  );

  const { team = [] } = coHost || {};
  const { close, isOpen, open } = useModal();

  return (
    <div className="rounded-lg border-neutral-100 bg-whitebase shadow-button-secondary p-6 flex gap-3 flex-col">
      <div className="flex justify-between">
        <h3 className="text-h5-medium text-neutral-900">Team</h3>
        <Button type="primary" size="small" onClick={open}>
          Invite
        </Button>
      </div>
      <div className="grid gap-4">
        {team?.map(
          (
            { member: { email, first_name, last_name, profile_url } },
            index
          ) => (
            <Cohost
              index={index}
              icon={
                <Avatar
                  shape="circle"
                  size={44}
                  src={profile_url || profileUrl}
                />
              }
              title={`${first_name} ${last_name}`}
              email={email}
            />
          )
        )}
      </div>
      <InviteCoHost close={close} isOpen={isOpen} />
    </div>
  );
};

const MemoMap = memo(MapCard);
const MemoTeamList = memo(TeamList);

const EventHomePage = () => {
  const { eventId = "" } = useParams<{ eventId: string }>();
  const { data, isLoading, isSuccess } = useGetEventByIdQuery(
    { eventId },
    { skip: !eventId }
  );

  const { type, name, end_date, start_date, venue, uuid, guests_info } =
    data || {};

  const { accepted_count, invited_count } = guests_info || {};
  useDocumentTitle(uuid ? `${type}-${name}` : "Event");

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={false} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <></>
        </Async.Empty>
        <Async.Success>
          <PageLayout>
            <div className="grid pr-4 gap-3 grid-cols-2">
              <div className="col-span-2 rounded-lg border-neutral-100 bg-whitebase shadow-button-secondary p-6 flex gap-3 flex-col">
                <div>
                  <h3 className="text-h3 text-neutral-900 first-letter:uppercase lowercase">
                    {name}
                  </h3>
                  <span className="text-body-regular text-neutral-600">
                    {type}
                  </span>
                </div>
                <Avatar
                  src={EVENT_IMG_LINK[type as keyof typeof EVENT_IMG_LINK]}
                  className="h-80 w-full object-cover rounded-lg"
                />
                <div className="flex gap-3 flex-col mt-1">
                  <h3 className="text-h5-medium text-neutral-900">Details</h3>
                  <div
                    className="grid grid-cols-3 justify-between gap-4"
                    key={uuid}
                  >
                    <DetailsItem
                      icon={
                        <span className="text-red-600 p-2.5 bg-red-100 rounded-lg">
                          <CalendarHeart size={32} color="currentColor" />
                        </span>
                      }
                      title={<>{dayjs(start_date).format("dddd")}</>}
                      subtitle={
                        <>
                          {dayjs(start_date).format("DD-MMM-YYYY")} -
                          {dayjs(end_date).format("DD-MMM-YYYY")}
                        </>
                      }
                    />
                    <DetailsItem
                      icon={
                        <span className="text-green-600 p-2.5 bg-green-100 rounded-lg">
                          <UsersRound size={32} color="currentColor" />
                        </span>
                      }
                      title={<>{invited_count || 0} Guests</>}
                      subtitle={<>{accepted_count || 0} accepted</>}
                    />

                    <DetailsItem
                      icon={
                        <span className="text-blue-600 p-2.5 bg-blue-100 rounded-lg">
                          <Map size={32} color="currentColor" />
                        </span>
                      }
                      title="Venue"
                      subtitle={venue?.name}
                    />
                  </div>
                </div>
              </div>
              <MemoTeamList />
              <MemoMap />
            </div>
          </PageLayout>
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default EventHomePage;
