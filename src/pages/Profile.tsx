import BottomNavbar from "@/components/BottomNavbar";
import BottomNavbarIcon from "@/components/BottomNavbarIcon";
import { House } from "lucide-react";

interface ProfileProps {
  user: {
    email: string;
  };
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="p-[15px] h-screen max-w-[1200px] mx-auto">
      <BottomNavbar>
        <BottomNavbarIcon Icon={House} />
      </BottomNavbar>
    </div>
  );
}
