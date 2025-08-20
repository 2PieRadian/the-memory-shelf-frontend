import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="p-[20px] flex flex-col gap-[40px] mt-[30px] items-center">
      <div className="font-semibold text-4xl text-center">OOPS!</div>
      <div className="font-semibold text-7xl text-center">404</div>
      <div className="font-light text-5xl text-center">Page Not Found</div>

      <Link to="/" className="mt-[50px]">
        <Button size={"lg"} className="cursor-pointer">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
