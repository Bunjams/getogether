import { Avatar } from "antd";
import Label from "components/Design/Label/Label";
import dayjs from "dayjs";
import { EVENT_IMG_LINK } from "dictionaries";
import { ReactNode } from "react";
import { useGetAllEventForVendorQuery } from "store/api/vendorEvents";

const EventCard = ({
  type,
  date,
  event_name,
  host,
}: {
  type: string;
  date: ReactNode;
  event_name: string;
  host: string;
}) => {
  return (
    <div className="p-4 flex gap-2.5 flex-col bg-white rounded">
      <Avatar
        src={EVENT_IMG_LINK[type as keyof typeof EVENT_IMG_LINK]}
        className="h-44 w-64 object-cover rounded-lg"
      />
      <div className="flex flex-col">
        <h5 className="text-h5-medium text-neutral-900">{event_name}</h5>
        <Label>Hosted by: {host}</Label>
        <Label>{date}</Label>
      </div>
    </div>
  );
};

const VendorUpcomingEvents = () => {
  const { data } = useGetAllEventForVendorQuery({
    show_upcoming: true,
  });

  const { events = [] } = data || {};

  return (
    <div className="flex gap-6 flex-col">
      <h4 className="text-h4 text-neutral-900">Upcoming events</h4>
      <div className="flex w-full flex-wrap gap-6">
        {events.map(
          ({ name, end_date, start_date, type, primary_host, uuid }) => {
            return (
              <EventCard
                key={uuid}
                type={type}
                event_name={name}
                host={primary_host || "-"}
                date={
                  <>
                    {dayjs(start_date).format("ddd")}{" "}
                    {dayjs(start_date).format("DD-MMM-YYYY")} - {""}
                    {dayjs(end_date).format("DD-MMM-YYYY")}
                  </>
                }
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default VendorUpcomingEvents;
