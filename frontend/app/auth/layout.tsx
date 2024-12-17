import React from "react";
import { ModeToggle } from "../../components/ui/toggle";

const Authlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="container relative">{children}</div>;
};

export default Authlayout;
