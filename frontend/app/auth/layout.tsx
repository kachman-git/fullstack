import React from "react";
import { ModeToggle } from "../../components/ui/toggle";

const Authlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="container relative">
      <div className="absolute top-2 right-3">
        <ModeToggle />
      </div>
      {children}
    </div>
  );
};

export default Authlayout;
