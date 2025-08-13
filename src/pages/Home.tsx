import BottomNavbar from "@/components/BottomNavbar";
import Navbar from "@/components/Navbar";

interface User {
  email: string;
}

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  return (
    <div className="p-[10px] h-screen">
      <Navbar />
      <BottomNavbar />
    </div>
  );
}
