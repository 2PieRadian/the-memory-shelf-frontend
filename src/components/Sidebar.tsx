import {
  useEffect,
  useState,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import Youtube from "@/icons/Youtube";
import Spotify from "@/icons/Spotify";

interface SidebarProps {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

interface SidebarButtonProps {
  to: string;
  Icon: React.ElementType;
  iconText: string;
}

function SidebarButton({ to = "", Icon, iconText }: SidebarButtonProps) {
  return (
    <NavLink
      to={to}
      className="flex items-center bg-light-100 gap-[10px] py-[10px] px-[20px] rounded-md"
    >
      <Icon size={30} />
      {iconText}
    </NavLink>
  );
}

function SidebarButtons() {
  return (
    <div className="flex flex-col gap-[15px] flex-1">
      <SidebarButton to="youtube" Icon={Youtube} iconText="Youtube" />
      <SidebarButton to="spotify" Icon={Spotify} iconText="Spotify" />
    </div>
  );
}

export default function Sidebar({ setOpenSidebar }: SidebarProps) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // const handleOutsideClick = (e: MouseEvent) => {
    //   const clickedElement = e.target;
    // };

    window.addEventListener("resize", handleResize);
    // window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      // window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const mobileStyles = "absolute top-0 left-0 h-[100svh] z-[220]";
  const desktopStyles = "";

  const styles = width < 800 ? mobileStyles : desktopStyles;

  return (
    <div
      className={`${styles} flex flex-col bg-white min-w-[260px] max-w-[300px] border-r border-light-100-border p-[20px]`}
    >
      <h1 className="font-light text-[20px] mb-[20px]">The Memory Shelf</h1>
      {/* Sidebar Buttons */}
      <SidebarButtons />

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
