import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="h-screen flex justify-center items-center px-[20px]">
      <Card className="w-full max-w-sm">
        <CardHeader className="grid gap-3">
          <CardTitle className="text-left">Sign Up</CardTitle>
          <CardDescription className="text-left">
            Enter your existing email and password below
          </CardDescription>
          <CardAction>
            <Button variant={"outline"} className="cursor-pointer">
              <Link to="/login">Sign In</Link>
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form action="">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="you@example.com" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm hover:underline underline-offset-4 inline-block"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full cursor-pointer">
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
