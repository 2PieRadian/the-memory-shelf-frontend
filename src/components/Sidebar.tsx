import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

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

  const mobileStyles = "absolute top-0 left-0 h-screen z-[200]";
  const desktopStyles = "";

  const styles = width < 800 ? mobileStyles : desktopStyles;

  return (
    <div
      className={`${styles} h-screen min-w-[260px] max-w-[300px] bg-light-100 border-r border-light-100-border`}
    ></div>
  );
}
