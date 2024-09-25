import React from "react";
import Logo from "../utils/Logo";
import { Card } from "@/components/ui/card";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <>
      <Card className="h-screen fixed md:w-60 top-0 bottom-0 lg:left-0 p-2 overflow-y-auto shadow-xl ">
          <div className="top-sidebar flex items-center justify-center  ">
            <Logo styles="md:w-48 w-16" />
          </div>
          <div className="pt-5 ">
            <SidebarItem />
          </div>
          <div>
            
          </div>
      </Card>
    </>
  );
}

export default Sidebar;
