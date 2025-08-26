import BottomNavbar from "@/components/BottomNavbar";
import BottomNavbarIcon from "@/components/BottomNavbarIcon";
import { useUserStore } from "@/store/UserStore";
import { House } from "lucide-react";

export default function Profile() {
  const { user } = useUserStore();
  console.log(user);

  return (
    <div className="p-[15px] h-screen max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-[20px] mb-[80px]">
        <h1 className="text-center font-semibold text-[20px]">Profile</h1>
        <div className="border-light-100-border bg-light-100 shadow-md rounded-lg p-[30px] flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-semibold text-[16px]">Email</span>
            <span className="font-normal text-[14px]">
              {user ? user.email : "Not logged in"}
            </span>
          </div>
        </div>
      </div>

      <BottomNavbar>
        <BottomNavbarIcon to="/" Icon={House} />
      </BottomNavbar>
    </div>
  );
}
