import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function VibeRoom() {
  return (
    <div className="bg-light-100 h-[100svh] p-[20px]">
      <h1 className="text-[25px] font-semibold">Welcome to Viberoom</h1>

      <Card className="mt-[30px]">
        <CardHeader className="text-xl">Get Started</CardHeader>

        <CardContent className="flex items-center gap-[20px]">
          <Button className="cursor-pointer">Join Room</Button>
          <Button className="cursor-pointer">Create Room</Button>
        </CardContent>
      </Card>
    </div>
  );
}
