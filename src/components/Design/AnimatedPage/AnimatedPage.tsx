import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade" | "slide";
}

const AnimatedPage = ({
  animation,
  children,
  className,
  ...props
}: MotionSectionProps) => {
  const sectionVariants =
    animation === "slide"
      ? {
          hidden: { opacity: 0, x: 200 },
          visible: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -200 },
        }
      : {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sectionVariants}
        transition={{ duration: 0.5 }}
        className={className}
        {...props}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
};

export default AnimatedPage;
