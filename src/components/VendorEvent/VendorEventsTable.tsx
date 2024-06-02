import { Dropdown, MenuProps, TableProps } from "antd";
import { InputProps } from "antd/es/input";
import Input from "components/Design/Input/Input";
import Table from "components/Design/Table/Table";
import Tag from "components/Design/Tag/Tag";
import dayjs from "dayjs";
import { VENDOR_EVENT_STATUS_COLOR } from "dictionaries";
import { useToast } from "hooks/useNotification";
import { Search as SearchIcon, Star } from "lucide-react";
import { useState } from "react";
import {
  useGetAllEventForVendorQuery,
  useUpdateVendorEventStatusMutation,
} from "store/api/vendorEvents";
import { InvitedVendor, VendorEvents } from "types/model/vendor";
import { BackendError } from "types/utils/backendError";
import { debounce } from "utils/debouncing";

const Status = ({
  status,
  eventId,
}: {
  status: VendorEvents["status"];
  eventId: string;
}) => {
  const { alert, success } = useToast();
  const [updateVendorEventStatus, { isLoading }] =
    useUpdateVendorEventStatusMutation();

  const onChange = debounce(
    async ({ status }: { status: VendorEvents["status"] }) => {
      try {
        await updateVendorEventStatus({
          eventId,
          status,
        }).unwrap();
        success({ message: "Status updated successfully" });
      } catch (error) {
        alert({ message: (error as BackendError).data.error.message });
      }
    }
  );

  const items: MenuProps["items"] = [
    {
      key: "NOT_STARTED",
      type: "item",
      label: (
        <button>
          <Tag tagColor={VENDOR_EVENT_STATUS_COLOR["NOT_STARTED"]}>
            Not started
          </Tag>
        </button>
      ),
      onClick: () => {
        onChange({ status: "NOT_STARTED" });
      },
    },
    {
      key: "IN_PROGRESS",
      type: "item",
      label: (
        <button>
          <Tag tagColor={VENDOR_EVENT_STATUS_COLOR["IN_PROGRESS"]}>
            In progress
          </Tag>
        </button>
      ),
      onClick: () => {
        onChange({ status: "IN_PROGRESS" });
      },
    },
    {
      key: "COMPLETED",
      type: "item",
      label: (
        <button>
          <Tag tagColor={VENDOR_EVENT_STATUS_COLOR["COMPLETED"]}>Completed</Tag>
        </button>
      ),
      onClick: () => {
        onChange({ status: "COMPLETED" });
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} disabled={isLoading}>
      <button>
        <Tag
          tagColor={
            VENDOR_EVENT_STATUS_COLOR[
              status as keyof typeof VENDOR_EVENT_STATUS_COLOR
            ]
          }
        >
          <div className="lowercase first-letter:uppercase">{status}</div>
        </Tag>
      </button>
    </Dropdown>
  );
};

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
      width: "20%",
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
      width: "20%",
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
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (status, row) => {
        if (!status) {
          return "-";
        }

        return <Status status={status} eventId={row.uuid} />;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "10%",
      render: (rating) => {
        if (!rating) return "-";

        return (
          <span className="flex items-center gap-1 text-yellow-500 text-h5-bold">
            {rating} <Star color="currentColor" fill="currentColor" />
          </span>
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
