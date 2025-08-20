import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <div className="w-full">
      <Input
        placeholder="Search"
        className="rounded-full p-[20px] !text-[16px]"
      />
    </div>
  );
}
