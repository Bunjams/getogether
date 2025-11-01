import { Avatar } from "antd";
import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Button from "components/Design/Button/Button";
import EventInfoCard from "components/Design/EventInfoCard/EventInfoCard";
import Loader from "components/Design/Loader/Loader";
import SubEventCard from "components/Design/SubEventCard/SubEventCard";
import dayjs from "dayjs";
import { EVENT_IMG_LINK } from "dictionaries";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useToast } from "hooks/useNotification";
import { CalendarHeart, Map, UsersRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetRSVPDetailsQuery,
  useRsvpActionMutation,
} from "store/api/guestInvitePublicAPI";
import { BackendError } from "types/utils/backendError";

const EventAction = ({
  rsvpId,
  eventId,
}: {
  rsvpId: string;
  eventId: string;
}) => {
  const [rsvpAction, { isLoading }] = useRsvpActionMutation();
  const navigate = useNavigate();
  const { alert } = useToast();

  const handleRsvpAction = async (response_type: "ACCEPTED" | "REJECTED") => {
    try {
      const { data } = await rsvpAction({ response_type, rsvpId }).unwrap();
      localStorage.setItem("authUser", JSON.stringify(data));

      if (!data.mobile) {
        navigate("/profile-setup", { replace: true, state: { email: null } });
        return;
      }
      if (!data.role) {
        navigate("/persona", { replace: true, state: { email: null } });
        return;
      }
      navigate(`/guest/${eventId}/home`, {
        replace: true,
        state: { email: null },
      });
    } catch (error) {
      alert({ message: (error as BackendError).data.error.message });
    }
  };

  return (
    <div className="flex items-center flex-col">
      <h3 className="text-h3 text-neutral-900 first-letter:uppercase lowercase">
        Will you join us?
      </h3>
      <span className="text-body-regular text-neutral-600">
        Click on buttons below to confirm your arrival
      </span>
      {isLoading ? (
        <div className="mt-4">
          <Loader />
        </div>
      ) : (
        <div className="flex gap-2 w-64 mt-4">
          <Button
            disabled={isLoading}
            type="primary"
            size="middle"
            block
            onClick={() => handleRsvpAction("ACCEPTED")}
          >
            Yes
          </Button>
          <Button
            disabled={isLoading}
            size="middle"
            block
            onClick={() => handleRsvpAction("REJECTED")}
          >
            No
          </Button>
        </div>
      )}
    </div>
  );
};

const MagicInvite = () => {
  const { hash } = useLocation();
  const payload = hash.replace("#", "");
  const { data, isLoading, isSuccess } = useGetRSVPDetailsQuery(
    { payload },
    { skip: !payload }
  );

  const { event, uuid: rsvpId } = data?.data || {};
  const {
    name,
    type,
    end_date,
    primary_host,
    start_date,
    uuid,
    venue,
    multi_event,
    subevents = [],
  } = event || {};

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
            <EventAction rsvpId={rsvpId!} eventId={uuid!} />
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
