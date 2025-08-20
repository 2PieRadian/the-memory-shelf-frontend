import { useRef, useState } from "react";
import { Menu, Plus, User } from "lucide-react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import BottomNavbarIcon from "@/components/BottomNavbarIcon";
import CreateModal from "@/components/CreateModal";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  function handleCreate() {
    setIsCreateModalOpen((prev) => !prev);
  }

  function handleCloseSidebar() {
    setOpenSidebar((prev) => !prev);
  }

  return (
    <div className="flex">
      {openSidebar && <Sidebar setOpenSidebar={setOpenSidebar} />}

      <div className="w-full relative p-[15px] h-[100svh] max-w-[1200px] mx-auto">
        <Navbar />

        <Outlet />

        {/* Create-Modal */}
        <CreateModal isCreateModalOpen={isCreateModalOpen} />

        <BottomNavbar>
          <>
            <BottomNavbarIcon Icon={Menu} onClick={handleCloseSidebar} />
            <BottomNavbarIcon Icon={Plus} onClick={handleCreate} />
            <BottomNavbarIcon Icon={User} to="/profile" />
          </>
        </BottomNavbar>
      </div>
    </div>
  );
}
