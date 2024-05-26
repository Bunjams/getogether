import type { TableProps } from "antd";
import Table from "components/Design/Table/Table";
import Tag from "components/Design/Tag/Tag";
import { RSVP_STATUS_COLOR } from "dictionaries";

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

const GuestTable = () => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default GuestTable;
