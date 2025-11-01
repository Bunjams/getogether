import type { TableProps } from "antd";
import { InputProps } from "antd/es/input";
import Input from "components/Design/Input/Input";
import Table from "components/Design/Table/Table";
import Tag from "components/Design/Tag/Tag";
import { RSVP_STATUS_COLOR } from "dictionaries";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetGuestlistQuery } from "store/api/hostguest";
import { Guest } from "types/model/guest";
import { debounce } from "utils/debouncing";

const GuestTable = () => {
  const [searchText, setSearchText] = useState("");
  const { eventId = "" } = useParams<{ eventId: string }>();
  const { data = [] } = useGetGuestlistQuery(
    { eventId, searchText },
    { skip: !eventId }
  );

  const columns: TableProps<Guest>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text) => text || "-",
    },
    {
      title: "Contact details",
      dataIndex: "email",
      key: "email",
      width: "50%",
      render: (text) => text || "-",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "20%",
      render: (text) => (
        <Tag
          tagColor={RSVP_STATUS_COLOR[text as keyof typeof RSVP_STATUS_COLOR]}
        >
          <div className="lowercase first-letter:uppercase ">{text}</div>
        </Tag>
      ),
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

export default GuestTable;
