import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

interface SidebarProps {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ setOpenSidebar }: SidebarProps) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    const handleOutsideClick = (e: MouseEvent) => {
      const clickedElement = e.target;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const mobileStyles = "absolute top-0 left-0 h-[100svh] z-[200]";
  const desktopStyles = "";

  const styles = width < 800 ? mobileStyles : desktopStyles;

  return (
    <div
      className={`${styles} flex flex-col min-w-[260px] max-w-[300px] bg-light-100 border-r border-light-100-border p-[20px]`}
    >
      {/* Sidebar Content */}
      <div className="flex-1"></div>

      <Button
        variant={"outline"}
        className="relative bottom-0 cursor-pointer w-full text-light-text"
        size={"lg"}
        onClick={() => setOpenSidebar(false)}
      >
        <ChevronLeft />
      </Button>
    </div>
  );
}
