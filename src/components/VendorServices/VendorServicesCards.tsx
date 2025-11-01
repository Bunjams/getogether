import { Avatar } from "antd";
import { useGetCurrentVendorAllServiceQuery } from "store/api/vendorService";

const randomColor = `#${(((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0").substr(0, 6)}`;

const ServiceCard = ({
  category,
  name,
}: {
  name: string;
  category: string;
}) => {
  return (
    <div className="p-4 rounded-lg bg-white flex gap-2.5 flex-col w-[290px]">
      <Avatar
        src={`https://robohash.org/${category}.png`}
        shape="circle"
        size={60}
        style={{ backgroundColor: randomColor }}
      />
      <div>
        <h4 className="text-h4 text-neutral-900">{name}</h4>
        <h5 className="text-h5-regular text-neutral-600 first-letter:uppercase lowercase">
          {category}
        </h5>
      </div>
    </div>
  );
};

const VendorServicesCards = () => {
  const { data } = useGetCurrentVendorAllServiceQuery();
  const { services = [] } = data || {};

  return (
    <div className="flex w-full flex-wrap gap-6">
      {services.map(({ category, name, uuid }) => (
        <ServiceCard key={uuid} name={name} category={category} />
      ))}
    </div>
  );
};

export default VendorServicesCards;
