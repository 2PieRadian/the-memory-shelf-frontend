import RoomOptions from "@/components/wiberoom/RoomOptions";
import "../lib/socket";
import { useEffect } from "react";
import { connectSocket } from "../lib/socket";

export default function VibeRoom() {
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div>
      <RoomOptions />
    </div>
  );
}
