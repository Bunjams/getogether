import { Avatar } from "antd";
import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import EventInfoCard from "components/Design/EventInfoCard/EventInfoCard";
import SubEventCard from "components/Design/SubEventCard/SubEventCard";
import dayjs from "dayjs";
import { EVENT_IMG_LINK } from "dictionaries";
import useDocumentTitle from "hooks/useDocumentTitle";
import { CalendarHeart, Map, UsersRound } from "lucide-react";
import { useGetEventByIdQuery } from "store/api/hostEvent";

const EventAction = () => {
  return (
    <div className="flex items-center flex-col">
      <h3 className="text-h3 text-neutral-900 first-letter:uppercase lowercase">
        Will you join us?
      </h3>
      <span className="text-body-regular text-neutral-600">
        Click on buttons below to confirm your arrival
      </span>
      <div className="flex gap-2 w-64 mt-4">
        <Button type="primary" size="middle" block>
          Yes
        </Button>
        <Button size="middle" block>
          No
        </Button>
      </div>
    </div>
  );
};

const MagicInvite = () => {
  // TODO: Replace eventId with actual eventId
  // 87ffe0ed-27b2-4d71-bb06-1d471e7cf0b8
  const { eventId = "" } = { eventId: "6f680b79-eb3e-42a9-8a28-f087a71bb1ed" };
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
    primary_host,
    subevents = [],
    multi_event,
  } = data || {};

  useDocumentTitle(uuid ? `${type} - ${name}` : "Event");

  return (
    <AnimatedPage
      animation="fade"
      className="flex w-full flex-col gap-2 px-40 py-14 bg-neutral-0 overflow-auto"
    >
      <Async.Root isEmpty={false} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <></>
        </Async.Empty>
        <Async.Success>
          <div className="rounded-lg border-neutral-100 bg-whitebase shadow-button-secondary p-6 flex gap-3 flex-col">
            <div className="flex items-center flex-col">
              <h3 className="text-h3 text-neutral-900 first-letter:uppercase lowercase">
                {name}
              </h3>
              <span className="text-body-regular text-neutral-600">{type}</span>
            </div>
            <Avatar
              src={EVENT_IMG_LINK[type as keyof typeof EVENT_IMG_LINK]}
              className="h-80 w-full object-cover rounded-lg"
            />
            <EventAction />
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
                    {subevents.map(
                      ({ name, end_date, start_date, uuid, venue }) => (
                        <SubEventCard
                          key={uuid}
                          date={
                            <>
                              {dayjs(start_date).format("dddd")} -{" "}
                              {dayjs(start_date).format("DD-MMM-YYYY")} - {""}
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
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default MagicInvite;
