"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const route = useRouter();
  const handleSignIn = () => {
    route.push("/auth/signin");
  };

  const handleSignUp = () => {
    route.push("/auth/signup");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-500 via-teal-600 to-blue-800">
      <Card className="w-[400px] bg-white shadow-xl rounded-lg">
        <CardHeader className="flex flex-col items-center">
          <Bookmark className="h-12 w-12 text-green-500" />
          <CardTitle className="mt-2 text-center text-2xl font-bold text-gray-800">
            Bookmarkly
          </CardTitle>
          <p className="text-sm text-gray-600">
            Save, organize, and access your favorite links anytime.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-700">
            Get started by signing in or creating a new account.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button
            className="bg-teal-500 hover:bg-teal-600"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
