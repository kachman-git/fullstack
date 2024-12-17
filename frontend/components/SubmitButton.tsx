"use client";
import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

type ButtonProps = {
  isLoading: boolean;
  classname?: string;
  children: React.ReactNode;
};

const SubmitButton = ({ isLoading, children, classname }: ButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} className={classname}>
      {isLoading ? (
        <div className="flex space-x-2 items-center justify-center">
          <LoaderCircle className="animate-spin" />
          <h2> ...Loading</h2>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
