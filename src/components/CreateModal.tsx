import Spotify from "@/icons/Spotify";
import X from "@/icons/X";
import Youtube from "@/icons/Youtube";
import { AnimatePresence, motion } from "motion/react";

export default function CreateModal({
  isCreateModalOpen,
}: {
  isCreateModalOpen: boolean;
}) {
  const modalButtonStyles =
    "flex items-center gap-[10px] py-[6px] px-[15px] bg-light-100 text-black rounded-[15px] cursor-pointer hover:bg-light-100-hover transition hover:scale-[1.05]";

  return (
    <AnimatePresence>
      {isCreateModalOpen && (
        <motion.div
          initial={{ y: "40px", scale: 0 }}
          animate={{ y: "0px", scale: 1 }}
          exit={{ y: "20px", scale: 0 }}
          transition={{ duration: 0.15 }}
          style={{ transformOrigin: "bottom center" }}
          className="fixed left-1/2 -translate-1/2 shadow-sm bottom-[-30px] rounded-[15px] bg-white overflow-hidden border border-light-100-border h-fit w-[250px] flex flex-col p-[20px] text-light-text"
        >
          <h1 className="font-semibold text-lg text-light-text text-center">
            Content Type
          </h1>

          <div className="mt-[20px] flex flex-col justify-between gap-[10px]">
            <button className={modalButtonStyles}>
              <Spotify size={35} /> Spotify
            </button>

            <button className={modalButtonStyles}>
              <Youtube size={35} /> Youtube
            </button>

            <button className={modalButtonStyles}>
              <X size={35} /> Twitter
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
