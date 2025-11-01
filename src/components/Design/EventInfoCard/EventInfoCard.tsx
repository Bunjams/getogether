import { motion } from "framer-motion";
import { ReactNode } from "react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const EventInfoCard = ({
  icon,
  title,
  subtitle,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  icon: ReactNode;
}) => {
  return (
    <motion.div
      className="flex gap-2 items-center bg-whitebase rounded-lg p-3"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
    >
      {icon}
      <div>
        <div className="text-h4 text-neutral-900">{title}</div>
        <div className="text-body-regular text-neutral-500">{subtitle}</div>
      </div>
    </motion.div>
  );
};

export default EventInfoCard;
