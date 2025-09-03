import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import type { Room } from "@/lib/interfaces";
import { getRooms } from "@/lib/api";
import RoomCard from "./RoomCard";

function RoomCardSkeleton() {
  return (
    <Skeleton className="flex justify-between items-center px-[20px] h-[52px] w-full rounded-xl bg-[hsl(0,0%,100%)]">
      <Skeleton className="h-[60%] w-[120px] rounded-xl bg-[hsl(0,0%,91%)]" />
      <Skeleton className="h-[60%] w-[73px] rounded-xl bg-[hsl(0,0%,13%)]" />
    </Skeleton>
  );
}

export default function YourRooms() {
  const [rooms, setRooms] = useState<Room[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true);
        const rooms = await getRooms();

        setRooms(rooms);
      } catch (err) {
        console.error("An error occurred: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  return (
    <div className="w-full max-w-[600px] px-[20px] shadow-md py-[30px] rounded-md bg-light-100">
      <h1 className="text-center font-semibold text-[20px]">Your Rooms</h1>

      <p className="text-center text-[13px] font-light">Rooms you've created</p>

      {loading ? (
        <div className="flex flex-col w-full gap-[10px] mt-[30px]">
          {Array.from({ length: 3 }, (_, i) => i).map(() => (
            <RoomCardSkeleton />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-[12px] mt-[30px]">
          {rooms?.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
