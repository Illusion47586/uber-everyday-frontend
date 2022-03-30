// default animations

// motion variants
const baseVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { staggerChildren: 0.1, duration: 0.3 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.3 },
  },
  scrolling: { scale: 0.95 },
};

const baseMotionSettings = {
  variants: baseVariants,
  animate: "visible",
  initial: "hidden",
  exit: "hidden",
  transition: { type: "tween" },
};

export { baseVariants, baseMotionSettings };
