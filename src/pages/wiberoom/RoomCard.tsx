import type { Room } from "@/lib/interfaces";
import { EllipsisVertical } from "lucide-react";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white hover:shadow-lg shadow-sm transition-shadow duration-200 cursor-pointer px-[20px] py-[12px] rounded-xl flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-md">{room.roomName}</p>
      </div>

      <button className="cursor-pointer text-md mr-[-8px] text-black rounded-xl">
        <EllipsisVertical size={20} color="hsl(0,0%,20%)" />
      </button>
    </div>
  );
}
