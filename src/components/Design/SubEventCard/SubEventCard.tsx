import Label from "components/Design/Label/Label";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const SubEventCard = ({
  date,
  name,
  venue,
}: {
  name: string;
  date: ReactNode;
  venue: string;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
      className="p-2 rounded border-neutral-100 border border-solid flex flex-col gap-2.5"
    >
      <h4 className="text-h4 text-neutral-900">{name}</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <Label>Date</Label>
          {date}
        </div>
        <div className="flex flex-col">
          <Label>Venue</Label>
          {venue}
        </div>
      </div>
    </motion.div>
  );
};

export default SubEventCard;
