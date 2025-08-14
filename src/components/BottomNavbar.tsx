import { motion } from "motion/react";
import type { ReactElement } from "react";

interface BottomNavbarProps {
  children: ReactElement;
}

export default function BottomNavbar({ children }: BottomNavbarProps) {
  return (
    <motion.div
      initial={{ y: "100px" }}
      animate={{ y: "0px" }}
      transition={{ duration: 0.4, ease: "backOut" }}
      className="absolute z-[100] shadow-lg bottom-[20px] left-1/2 -translate-x-1/2 w-fit flex gap-[20px] items-center justify-between bg-light-100 border border-light-100-border rounded-full p-[9px]"
    >
      {children}
    </motion.div>
  );
}
