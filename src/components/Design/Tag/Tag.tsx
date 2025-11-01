import { Tag as AntTag, TagProps } from "antd";
import classNames from "classnames";

const Tag = ({ tagColor, ...props }: TagProps & { tagColor: string }) => {
  return (
    <AntTag
      className={classNames("rounded-full text-body-medium", {
        "bg-red-100 border-red-200 text-red-600": tagColor === "red",
        "bg-green-100 border-green-300 text-green-700": tagColor === "green",
        "bg-orange-100 border-orange-300 text-orange-600":
          tagColor === "orange",
      })}
      {...props}
    />
  );
};

export default Tag;
