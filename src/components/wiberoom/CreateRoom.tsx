import { Globe, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { PrivacyOptions } from "@/lib/interfaces";
import { useState, type ChangeEvent } from "react";

export default function CreateRoom() {
  const [selectedPrivacy, setSelectedPrivacy] =
    useState<PrivacyOptions>("public");
  const [roomName, setRoomName] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setRoomName(e.target.value);
  }

  return (
    <div className="border-light-100-border bg-light-100 shadow-md rounded-lg p-[30px] flex flex-col gap-[30px]">
      <div>
        <h1 className="text-center font-semibold text-[20px]">
          Create a New Room
        </h1>
        <p className="font-light text-[13px] text-center">
          Set up your own room and invite friends to watch together
        </p>
      </div>

      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[7px]">
          <Label className="font-normal">Room Name</Label>
          <Input
            placeholder="Enter a name for your room"
            value={roomName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <Label className="font-normal">Room Privacy</Label>

          <div className="flex gap-[10px]">
            <Button
              variant={selectedPrivacy === "public" ? "default" : "outline"}
              className="flex-1 cursor-pointer"
              onClick={() => setSelectedPrivacy("public")}
            >
              <Globe />
              Public
            </Button>
            <Button
              variant={selectedPrivacy === "private" ? "default" : "outline"}
              className="flex-1 cursor-pointer"
              onClick={() => setSelectedPrivacy("private")}
            >
              <Lock />
              Private
            </Button>
          </div>
        </div>
      </div>

      <Button className="w-full cursor-pointer">Create Room</Button>
    </div>
  );
}
