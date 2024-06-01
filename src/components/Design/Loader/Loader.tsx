import classNames from "classnames";
import { motion } from "framer-motion";

const Loader = ({ size = "44" }: { size?: string }) => {
  const pathVariants = {
    hidden: {
      pathLength: 0.1,
      opacity: 0.5,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M9.58726 28.6391C9.58216 28.7821 9.57959 28.9256 9.57959 29.0698C9.57959 35.7467 15.094 41.1594 21.8963 41.1594C28.6987 41.1594 34.2131 35.7467 34.2131 29.0698C34.2131 28.9256 34.2105 28.7821 34.2054 28.6391H28.5273C28.5385 28.7948 28.5443 28.952 28.5443 29.1105C28.5443 32.7368 25.5493 35.6765 21.8549 35.6765C18.1604 35.6765 15.1655 32.7368 15.1655 29.1105C15.1655 28.952 15.1712 28.7948 15.1825 28.6391H9.58726Z"
        fill="none"
        stroke="#EF897A"
        strokeWidth="2"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.2131 15.4637C34.2131 22.4352 28.6987 28.0867 21.8963 28.0867C15.094 28.0867 9.57959 22.4352 9.57959 15.4637C9.57959 8.49214 15.094 2.84061 21.8963 2.84061C22.1332 2.84061 22.3685 2.84746 22.6021 2.86098H33.7376V8.64963H32.2662C33.4984 10.6152 34.2131 12.9539 34.2131 15.4637ZM28.5442 15.5061C28.5442 19.2925 25.5493 22.3619 21.8548 22.3619C18.1604 22.3619 15.1655 19.2925 15.1655 15.5061C15.1655 11.7198 18.1604 8.65042 21.8548 8.65042C25.5493 8.65042 28.5442 11.7198 28.5442 15.5061Z"
        fill="none"
        stroke="#EF897A"
        strokeWidth="2"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
    </motion.svg>
  );
};

export default Loader;

export const PageLoader = ({
  noBorder = false,
  block,
}: {
  noBorder?: boolean;
  block?: boolean;
}) => {
  return (
    <section
      className={classNames("flex justify-center items-center h-screen", {
        "border-none": noBorder,
        "bg-neutral-0 border-8 border-red-400 w-full": !noBorder,
        "w-full": block,
      })}
    >
      <Loader />
    </section>
  );
};
