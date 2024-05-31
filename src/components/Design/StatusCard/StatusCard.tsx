import classNames from "classnames";
import { motion } from "framer-motion";

type StatusCardProps = {
  type: "success" | "pending" | "rejected";
  count: number;
  lable: string;
  animationDir?: "top" | "bottom";
};

const StatusCard = ({
  count,
  type,
  lable,
  animationDir = "top",
}: StatusCardProps) => {
  const formattedCount = count.toString().padStart(2, "0");

  const dir = animationDir === "top" ? -50 : 50;

  const sectionVariants = {
    hidden: { opacity: 0, y: dir },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-9 px-[60px] rounded-lg bg-white shadow-button-secondary flex gap-2 flex-wrap">
      <motion.span
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5 }}
        className={classNames("text-title", {
          "text-green-700": type === "success",
          "text-red-600": type === "rejected",
          "text-orange-600": type === "pending",
        })}
      >
        {formattedCount}
      </motion.span>
      <span className="text-h4 text-neutral-500 self-end">{lable}</span>
    </div>
  );
};

export default StatusCard;
