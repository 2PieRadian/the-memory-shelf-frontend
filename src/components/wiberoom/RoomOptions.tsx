import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";

export default function RoomOptions() {
  return (
    <div className="bg-white h-[100svh]">
      <header className="py-[20px] px-[40px] border-b border-light-100-border">
        <h1 className="text-[20px]">viberoom</h1>
      </header>

      <div className="px-[20px]">
        <Tabs
          defaultValue="join-room"
          className="w-full max-w-[500px] mt-[40px] mx-auto"
        >
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
