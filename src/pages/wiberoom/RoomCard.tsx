import type { Room } from "@/lib/interfaces";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white shadow-md px-[20px] py-[10px] rounded-xl flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-md">{room.roomName}</p>
      </div>

      <button className="cursor-pointer bg-black text-md text-white py-[4px] px-[20px] rounded-xl">
        Join
      </button>
    </div>
  );
}
