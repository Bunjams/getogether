import type { TableProps } from "antd";
import { InputProps } from "antd/es/input";
import Input from "components/Design/Input/Input";
import Table from "components/Design/Table/Table";
import Tag from "components/Design/Tag/Tag";
import { RSVP_STATUS_COLOR } from "dictionaries";
import { Search as SearchIcon } from "lucide-react";

interface DataType {
  key: string;
  name: string;
  email: string;
  tag: string;
}

const data: DataType[] = [
  {
    key: "2",
    name: "Vikas",
    email: "vikas@inkle.io",
    tag: "Approved",
  },
  {
    key: "3",
    name: "Swapnil Sinha",
    email: "swapnil@inkle.io",
    tag: "Pending",
  },
  {
    key: "4",
    name: "Vivekita Banyal",
    email: "vivekita@inkle.io",
    tag: "Pending",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
  {
    key: "1",
    name: "Sandeep Yadav",
    email: "sandeep@inkle.io",
    tag: "Declined",
  },
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Contact details",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Status",
    key: "tag",
    dataIndex: "tag",
    render: (_, { tag }) => (
      <Tag tagColor={RSVP_STATUS_COLOR[tag as keyof typeof RSVP_STATUS_COLOR]}>
        {tag.toUpperCase()}
      </Tag>
    ),
  },
];

const onSearch: InputProps["onChange"] = (e) => {
  //TODO: add Search functionality
  console.log({ e });
};

const GuestTable = () => {
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
