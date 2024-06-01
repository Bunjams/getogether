import { Rate, TableProps } from "antd";
import { InputProps } from "antd/es/input";
import Input from "components/Design/Input/Input";
import Table from "components/Design/Table/Table";
import Tag from "components/Design/Tag/Tag";
import { VENDOR_EVENT_STATUS_COLOR } from "dictionaries";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetInvitedVendorsQuery } from "store/api/hostVendor";
import { InvitedVendor } from "types/model/vendor";
import { debounce } from "utils/debouncing";

// TODO: Remove this mock data
const service = [
  {
    name: "Pre wedding photoshot",
    uuid: "61410b0c-f8cf-444b-9803-f77071f569eb",
    category: "MISCELLANEOUS",
  },
  {
    name: "Photograpy",
    uuid: "7defbc06-2ea1-4ebc-bc43-55647cca1070",
    category: "MISCELLANEOUS",
  },
  {
    name: "Baby shower Decoration",
    uuid: "15f2d9c1-b6ae-4c36-900b-6f5adf299420",
    category: "DECORATION",
  },
];

const VendorTable = () => {
  const [searchText, setSearchText] = useState("");
  const { eventId = "" } = useParams<{ eventId: string }>();
  const { data = [] } = useGetInvitedVendorsQuery(
    { eventId, searchText },
    { skip: !eventId }
  );

  const columns: TableProps<InvitedVendor>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (name) => name || "-",
    },

    {
      title: "Contact details",
      dataIndex: "email",
      key: "email",
      width: "25%",
      render: (email) => email || "-",
    },

    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      width: "25%",
      render: (services: InvitedVendor["services"]) => {
        if (services?.length === 0) {
          return "-";
        }

        return (
          <div className="flex flex-col">
            {service?.map(({ name }) => <div>{name}</div>)}
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

    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "20%",
      render: (rating, _, i) => {
        const onChange = (value: number) => {
          console.log(value);
        };

        return <Rate onChange={onChange} defaultValue={rating} />;
      },
    },
  ];

  const onSearch: InputProps["onChange"] = debounce((e) => {
    setSearchText(e.target.value);
  });

  return (
    <Table
      columns={columns}
      dataSource={data}
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

export default VendorTable;
