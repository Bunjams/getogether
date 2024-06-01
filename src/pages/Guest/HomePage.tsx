import { Avatar } from "antd";
import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import EventInfoCard from "components/Design/EventInfoCard/EventInfoCard";
import PageLayout from "components/Design/PageLayout/PageLayout";
import SubEventCard from "components/Design/SubEventCard/SubEventCard";
import dayjs from "dayjs";
import { EVENT_IMG_LINK } from "dictionaries";
import useDocumentTitle from "hooks/useDocumentTitle";
import { CalendarHeart, Map, UsersRound } from "lucide-react";
import { MapCard } from "pages/Host/EventHomePage";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { useGetEventByIdForGuestQuery } from "store/api/guest";

const MemoMap = memo(MapCard);

const HomePage = () => {
  const { eventId = "" } = useParams<{ eventId: string }>();
  const { data, isLoading, isSuccess } = useGetEventByIdForGuestQuery(
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
    primary_host,
    multi_event,
    guest_subevents = [],
  } = data || {};

  useDocumentTitle(uuid ? `${type} - ${name}` : "Event");

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={false} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <></>
        </Async.Empty>
        <Async.Success>
          <PageLayout>
            <div className="grid pr-4 gap-3 grid-rows-2">
              <div className="rounded-lg border-neutral-100 bg-whitebase shadow-button-secondary p-6 flex gap-3 flex-col">
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
                    <EventInfoCard
                      icon={
                        <span className="text-green-600 p-2.5 bg-green-100 rounded-lg">
                          <UsersRound size={32} color="currentColor" />
                        </span>
                      }
                      title="Hosted by"
                      subtitle={primary_host}
                    />
                    {!multi_event && (
                      <>
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
                        <EventInfoCard
                          icon={
                            <span className="text-blue-600 p-2.5 bg-blue-100 rounded-lg">
                              <Map size={32} color="currentColor" />
                            </span>
                          }
                          title="Venue"
                          subtitle={venue?.name}
                        />
                      </>
                    )}
                    {multi_event && (
                      <div className="col-span-3 flex gap-3 flex-col">
                        {guest_subevents.map(
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
              <MemoMap />
            </div>
          </PageLayout>
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default HomePage;
