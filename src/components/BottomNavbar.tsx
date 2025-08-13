import { Plus } from "lucide-react";

export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 flex items-center justify-center bg-light-200 w-screen p-[10px]">
      <div className="rounded-full cursor-pointer bg-black p-[7px]">
        <Plus color="white" size={25} />
      </div>
    </div>
  );
}
