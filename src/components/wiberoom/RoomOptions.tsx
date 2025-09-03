import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";

export default function RoomOptions() {
  return (
    <div className="bg-white w-full max-w-[600px]">
      <div>
        <Tabs defaultValue="join-room" className="w-full">
          <TabsList className="h-auto mx-auto">
            <TabsTrigger
              value="join-room"
              className="cursor-pointer px-[20px] py-[8px]"
            >
              Join a Room
            </TabsTrigger>
            <TabsTrigger
              value="create-room"
              className="cursor-pointer px-[20px] py-[8px]"
            >
              Create Room
            </TabsTrigger>
          </TabsList>

          <TabsContent value="join-room" className="!w-full">
            <JoinRoom />
          </TabsContent>
          <TabsContent value="create-room">
            <CreateRoom />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
