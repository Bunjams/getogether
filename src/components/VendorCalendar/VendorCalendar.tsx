import { Badge, BadgeProps, Calendar, CalendarProps, Tooltip } from "antd";
import Tag from "components/Design/Tag/Tag";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  VENDOR_EVENT_INVITE_STATUS_BADGE,
  VENDOR_EVENT_STATUS_COLOR,
} from "dictionaries";
import React from "react";
import { useGetAllEventForVendorQuery } from "store/api/vendorEvents";

const VendorCalendar: React.FC = () => {
  const { data } = useGetAllEventForVendorQuery({});
  const { events = [] } = data || {};

  const dateCellRender = (value: Dayjs) => {
    const date = dayjs(value).format("DD");
    const month = dayjs(value).format("MM");
    const year = dayjs(value).format("YYYY");
    return (
      <ul>
        {events.map(
          ({
            start_date,
            end_date,
            name: eventName,
            uuid,
            status,
            subevents,
            multi_event,
          }) => {
            if (subevents) {
              return subevents.map(({ start_date, end_date, name, uuid }) => {
                const startDate = dayjs(start_date).format("DD");
                const endDate = dayjs(end_date).format("DD");
                const startDateMonth = dayjs(start_date).format("MM");
                const endDateMonth = dayjs(end_date).format("MM");
                const startDateYear = dayjs(start_date).format("YYYY");
                const endDateYear = dayjs(end_date).format("YYYY");

                if (
                  month === startDateMonth &&
                  month === endDateMonth &&
                  year === startDateYear &&
                  year === endDateYear
                ) {
                  if (startDate === date || endDate === date) {
                    const startLable = startDate === date && "Start on";
                    const endLabel = endDate === date && "End on";
                    const text = multi_event ? (
                      <span className="text-body-bold">
                        {name}
                        <span className="text-footnote">
                          {" "}
                          ({eventName} {startLable} {endLabel})
                        </span>
                      </span>
                    ) : (
                      <span className="text-body-bold">{name}</span>
                    );
                    return (
                      <Tooltip
                        title={
                          <Tag
                            tagColor={
                              VENDOR_EVENT_STATUS_COLOR[
                                status as keyof typeof VENDOR_EVENT_STATUS_COLOR
                              ]
                            }
                          >
                            <div className="lowercase first-letter:uppercase">
                              {status}
                            </div>
                          </Tag>
                        }
                      >
                        <li
                          key={uuid}
                          className="border border-solid border-red-200 p-1 rounded"
                        >
                          <Badge
                            status={
                              VENDOR_EVENT_INVITE_STATUS_BADGE[
                                status
                              ] as BadgeProps["status"]
                            }
                            text={text}
                          />
                        </li>
                      </Tooltip>
                    );
                  }
                  return null;
                }
              });
            }

            return null;
          }
        )}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default VendorCalendar;
