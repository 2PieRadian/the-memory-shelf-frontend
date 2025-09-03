import RoomOptions from "@/components/wiberoom/RoomOptions";
import { useEffect } from "react";
import { connectSocket } from "../lib/socket";
import "../lib/socket";
import YourRooms from "./wiberoom/YourRooms";

export default function VibeRoom() {
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div className="min-h-[100svh]">
      <header className="py-[20px] px-[40px] border-b border-light-100-border">
        <h1 className="text-[20px]">viberoom</h1>
      </header>

      <div className="w-full mx-auto flex flex-col items-center justify-center lg:flex-row lg:items-start max-w-[1200px] py-[30px] px-[20px] gap-[20px]">
        <RoomOptions />

        <YourRooms />
      </div>
    </div>
  );
}
