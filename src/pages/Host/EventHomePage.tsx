import { Avatar } from "antd";
import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import EventInfoCard from "components/Design/EventInfoCard/EventInfoCard";
import PageLayout from "components/Design/PageLayout/PageLayout";
import SubEventCard from "components/Design/SubEventCard/SubEventCard";
import Tag from "components/Design/Tag/Tag";
import dayjs from "dayjs";
import { CO_HOST_STATUS_COLOR, EVENT_IMG_LINK } from "dictionaries";
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

const Cohost = ({
  icon,
  title,
  email,
  index,
  tag,
}: {
  title: ReactNode;
  email: ReactNode;
  icon: ReactNode;
  index: number;
  tag: ReactNode;
}) => {
  return (
    <motion.div
      className="flex items-center bg-whitebase rounded-lg p-3 flex-wrap justify-between"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: index + 1 * 0.5 }}
    >
      <div className="flex gap-3 items-center flex-wrap">
        {icon}
        <div>
          <div className="text-h5-medium text-neutral-900">{title}</div>
          <div className="text-footnote text-neutral-500">{email}</div>
        </div>
      </div>
      {tag}
    </motion.div>
  );
};

export const MapCard = () => {
  return (
    <div className="h-96 rounded-lg border-neutral-100 bg-whitebase shadow-button-secondary p-6 flex gap-3 flex-col">
      <iframe
        className="h-full"
        src="https://api.mapbox.com/styles/v1/siriuswapnil/clwxqae6f01f201nycb0h090m.html?title=false&access_token=pk.eyJ1Ijoic2lyaXVzd2FwbmlsIiwiYSI6ImNsd3hwbDBqejFjYjkybHBzYjBmeGU5YnQifQ.OgvMgngDR35W2Hek18141w&zoomwheel=false#12.75/12.97154/77.60227"
        title="Untitled"
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

  const { team = [], invited_team_members } = coHost || {};
  const { close, isOpen, open } = useModal();

  return (
    <div className="rounded-lg border-neutral-100 bg-whitebase shadow-button-secondary p-6 flex gap-3 flex-col">
      <div className="flex justify-between">
        <h3 className="text-h5-medium text-neutral-900">Team</h3>
        <Button type="primary" size="middle" onClick={open}>
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
              tag={
                <Tag tagColor={CO_HOST_STATUS_COLOR["ACCEPTED"]}>
                  <div className="lowercase first-letter:uppercase">
                    ACCEPTED
                  </div>
                </Tag>
              }
            />
          )
        )}
        {invited_team_members?.map(({ email, name }, index) => (
          <Cohost
            index={index}
            icon={<Avatar shape="circle" size={44} src={profileUrl} />}
            title={name}
            email={email}
            tag={
              <Tag tagColor={CO_HOST_STATUS_COLOR["PENDING"]}>
                <div className="lowercase first-letter:uppercase">PENDING</div>
              </Tag>
            }
          />
        ))}
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

  const {
    type,
    name,
    end_date,
    start_date,
    venue,
    uuid,
    guests_info,
    subevents = [],
    multi_event,
    primary_host,
  } = data || {};

  const { accepted_count, invited_count } = guests_info || {};
  useDocumentTitle(uuid ? `${type} - ${name}` : "Event");

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
                    {!multi_event && (
                      <EventInfoCard
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
                    )}
                    <EventInfoCard
                      icon={
                        <span className="text-green-600 p-2.5 bg-green-100 rounded-lg">
                          <UsersRound size={32} color="currentColor" />
                        </span>
                      }
                      title={<>{invited_count || 0} Guests</>}
                      subtitle={<>{accepted_count || 0} accepted</>}
                    />

                    {!multi_event && (
                      <EventInfoCard
                        icon={
                          <span className="text-blue-600 p-2.5 bg-blue-100 rounded-lg">
                            <Map size={32} color="currentColor" />
                          </span>
                        }
                        title="Venue"
                        subtitle={venue?.name}
                      />
                    )}
                    {multi_event && (
                      <div className="col-span-3 flex gap-3 flex-col">
                        {subevents.map(
                          ({ name, end_date, start_date, uuid, venue }) => (
                            <SubEventCard
                              key={uuid}
                              date={
                                <>
                                  {dayjs(start_date).format("dddd")} -{" "}
                                  {dayjs(start_date).format("DD-MMM-YYYY")} -{" "}
                                  {""}
                                  {dayjs(end_date).format("DD-MMM-YYYY")}
                                </>
                              }
                              name={name}
                              venue={venue.name}
                            />
                          )
                        )}
                      </div>
                    )}
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
