import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";

const SIGNUP_URL = import.meta.env.VITE_BACKEND_SIGNUP_URL;

interface SignUpProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export default function Signup({ setIsAuthenticated }: SignUpProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center px-[20px]">
      <Card className="w-full max-w-sm">
        <CardHeader className="grid gap-1">
          <CardTitle className="text-left text-lg">Sign up</CardTitle>
          <CardDescription className="text-left">
            Create a new account with your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-[25px] items-center">
              <Button type="submit" className="w-full cursor-pointer">
                Create Account
              </Button>

              <div className="text-sm flex items-center gap-[5px]">
                <p>Already have an account?</p>
                <Link to="/login" className="underline">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
