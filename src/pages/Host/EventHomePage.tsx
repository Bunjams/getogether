import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import PageLayout from "components/Design/PageLayout/PageLayout";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import useDocumentTitle from "hooks/useDocumentTitle";
import { CalendarHeart, Map, UsersRound } from "lucide-react";
import { memo, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "store/api/event";
import { useGetGuestlistQuery } from "store/api/guest";

const DetailsItem = ({
  icon,
  title,
  subtitle,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  icon: ReactNode;
}) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

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

const MemoMap = memo(MapCard);

const EventHomePage = () => {
  const { eventId = "" } = useParams<{ eventId: string }>();
  const { data, isLoading, isSuccess } = useGetEventByIdQuery(
    { eventId },
    { skip: !eventId }
  );

  //   TODO: add total count, approved count in  useGetEventByIdQuery
  const { data: guestList = [] } = useGetGuestlistQuery(
    { eventId },
    { skip: !eventId }
  );

  const totalGuests = guestList.length;
  const acceptedCount = guestList.filter(
    ({ status }) => status === "ACCEPTED"
  ).length;

  const { type, name, end_date, start_date, venue, uuid } = data || {};

  useDocumentTitle(uuid ? `${type}-${name}` : "Event");

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root isEmpty={false} isLoading={isLoading} isSuccess={isSuccess}>
        <Async.Empty>
          <></>
        </Async.Empty>
        <Async.Success>
          <PageLayout>
            <div className="grid pr-4 gap-3">
              <div className="rounded-lg border-neutral-100 bg-whitebase shadow-button-secondary p-6 flex gap-3 flex-col">
                <div>
                  <h3 className="text-h3 text-neutral-900 first-letter:uppercase lowercase">
                    {type}
                  </h3>
                  <span className="text-body-regular text-neutral-600">
                    {name}
                  </span>
                </div>
                <img
                  loading="lazy"
                  className="h-80 w-full object-cover rounded-lg"
                  src="https://images.unsplash.com/photo-1716903904403-20a28f5afb88?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                      title={<>{totalGuests} Guests</>}
                      subtitle={<>{acceptedCount} accepted</>}
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
              <MemoMap />
            </div>
          </PageLayout>
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default EventHomePage;
