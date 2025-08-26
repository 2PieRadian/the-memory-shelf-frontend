import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/UserStore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, isLoggingIn, setIsLoggingIn } = useUserStore();

  const backend_login_url = import.meta.env.VITE_BACKEND_LOGIN_URL;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoggingIn(true);

      const res = await fetch(backend_login_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (res.ok) {
        // Set Global User State
        const data = await res.json();
        setUser(data);

        // Redirect to Home Page
        navigate("/");
      } else {
        const failedResponseMessage = await res.json();
        console.log(failedResponseMessage.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div className="h-[100svh] flex justify-center items-center px-[20px]">
      <Card className="w-full max-w-sm">
        <CardHeader className="grid gap-1">
          <CardTitle className="text-left text-lg">Login</CardTitle>
          <CardDescription className="text-left">
            Enter your registered credentials
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
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
                <Input
                  id="password"
                  type="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <div className="grid gap-4">
                <Button type="submit" className="w-full cursor-pointer">
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>

                <div className="text-sm justify-center flex items-center gap-[5px]">
                  <p>Don't have an account?</p>
                  <Link to="/signup" className="underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
