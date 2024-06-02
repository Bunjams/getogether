import { TableProps } from "antd";
import { InputProps } from "antd/es/input";
import Input from "components/Design/Input/Input";
import Table from "components/Design/Table/Table";
import Tag from "components/Design/Tag/Tag";
import dayjs from "dayjs";
import { VENDOR_EVENT_STATUS_COLOR } from "dictionaries";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useGetAllEventForVendorQuery } from "store/api/vendorEvents";
import { InvitedVendor, VendorEvents } from "types/model/vendor";
import { debounce } from "utils/debouncing";

const VendorEventsTable = () => {
  const [searchText, setSearchText] = useState("");

  const { data } = useGetAllEventForVendorQuery({
    searchText,
    show_upcoming: false,
  });

  const { events = [] } = data || {};

  const columns: TableProps<VendorEvents>["columns"] = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (name) => name || "-",
    },

    {
      title: "Host",
      dataIndex: "primary_host",
      key: "primary_host",
      width: "20%",
      render: (primary_host) => {
        return primary_host || "-";
      },
    },

    {
      title: "Date",
      dataIndex: "start_date",
      key: "date",
      width: "25%",
      render: (date, row) => {
        const { end_date, start_date } = row || {};

        return (
          <>
            {dayjs(start_date).format("ddd")}{" "}
            {dayjs(start_date).format("DD-MMM-YYYY")} - {""}
            {dayjs(end_date).format("DD-MMM-YYYY")}
          </>
        );
      },
    },

    {
      title: "Services",
      dataIndex: "vendor_services",
      key: "vendor_services",
      width: "25%",
      render: (services: InvitedVendor["services"]) => {
        if (services?.length === 0) {
          return "-";
        }

        return (
          <div className="flex flex-col">
            {services?.map(({ name }) => <div>{name}</div>)}
          </div>
        );
      },
    },

    {
      title: "Status",
      key: "event_status",
      dataIndex: "event_status",
      width: "10%",
      render: (event_status) => {
        if (!event_status) {
          return "-";
        }
        // TODO: add update event_status api and UI

        return (
          <Tag
            tagColor={
              VENDOR_EVENT_STATUS_COLOR[
                event_status as keyof typeof VENDOR_EVENT_STATUS_COLOR
              ]
            }
          >
            <div className="lowercase first-letter:uppercase">
              {event_status}
            </div>
          </Tag>
        );
      },
    },
  ];

  const onSearch: InputProps["onChange"] = debounce((e) => {
    setSearchText(e.target.value);
  });

  return (
    <Table
      columns={columns}
      dataSource={events}
      pagination={false}
      header={
        <header className="grid grid-cols-3 py-2.5">
          <Input
            placeholder="Search"
            onChange={onSearch}
            suffix={
              <span className="text-neutral-400">
                <SearchIcon strokeWidth={2} size={16} color="currentColor" />
              </span>
            }
          />
        </header>
      }
    />
  );
};

export default VendorEventsTable;
