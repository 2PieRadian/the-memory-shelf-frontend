import BottomNavbar from "@/components/BottomNavbar";
import BottomNavbarIcon from "@/components/BottomNavbarIcon";
import { useUserStore } from "@/store/UserStore";
import { House } from "lucide-react";

export default function Profile() {
  const user = useUserStore((state) => state.user);

  console.log(user);

  return (
    <div className="p-[15px] h-screen max-w-[1200px] mx-auto">
      <BottomNavbar>
        <BottomNavbarIcon to="/" Icon={House} />
      </BottomNavbar>
    </div>
  );
}
