import { useState, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setRoomCode(e.target.value);
  }

  return (
    <div className="border-light-100-border bg-light-100 rounded-lg shadow-md p-[30px] flex flex-col gap-[30px]">
      <div>
        <h1 className="text-center font-semibold text-[20px]">
          Join an Existing Room
        </h1>
        <p className="font-light text-[13px] text-center">
          Enter a room code to join your friends and watch together
        </p>
      </div>

      <div className="flex flex-col gap-[10px]">
        <Label className="font-normal">Room Code</Label>
        <Input
          placeholder="Enter 6-digit room code"
          value={roomCode}
          onChange={handleChange}
        />
      </div>

      <Button className="w-full cursor-pointer">Join Room</Button>
    </div>
  );
}
