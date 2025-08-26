import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, TvMinimalPlay } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Youtube from "@/icons/Youtube";
import Spotify from "@/icons/Spotify";
import { useUserStore } from "@/store/UserStore";

interface SidebarProps {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

interface SidebarButtonProps {
  to: string;
  Icon: React.ElementType;
  iconText: string;
}

function SidebarButton({ to = "", Icon, iconText }: SidebarButtonProps) {
  const styles = "flex items-center gap-[10px] py-[10px] px-[20px] rounded-md";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? "bg-light-100" : ""} ${styles}`
      }
    >
      <Icon size={30} />
      {iconText}
    </NavLink>
  );
}

function SidebarButtons() {
  const viberoomStyles =
    "cursor-pointer flex items-center gap-[10px] py-[10px] px-[20px] rounded-md";
  return (
    <div className="flex flex-col gap-[15px] flex-1">
      <SidebarButton to="youtube" Icon={Youtube} iconText="Youtube" />
      <SidebarButton to="spotify" Icon={Spotify} iconText="Spotify" />

      <NavLink
        to="viberoom"
        className={({ isActive }) =>
          `${isActive ? "bg-light-100" : ""} ${viberoomStyles}`
        }
      >
        <TvMinimalPlay />
        Vibe Room
      </NavLink>
    </div>
  );
}

export default function Sidebar({ setOpenSidebar }: SidebarProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function handleLogout() {
    const logoutUrl = "http://localhost:3000/api/v1/logout";

    try {
      const response = await fetch(logoutUrl, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }

  const mobileStyles = "absolute top-0 left-0 h-[100svh] z-[220]";
  const desktopStyles = "";

  const styles = width < 800 ? mobileStyles : desktopStyles;

  return (
    <div
      className={`${styles} flex flex-col bg-white min-w-[260px] max-w-[300px] border-r border-light-100-border p-[20px]`}
    >
      <Link to="/" className="font-light text-[20px] mb-[20px]">
        The Memory Shelf
      </Link>
      {/* Sidebar Buttons */}
      <SidebarButtons />

      {/* Logout Button */}
      <Button
        variant={"outline"}
        size={"lg"}
        onClick={handleLogout}
        className="mb-[10px] cursor-pointer bg-red-500! hover:bg-red-500-hover! border-none! text-white hover:text-white"
      >
        Logout
      </Button>

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
