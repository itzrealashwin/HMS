import React from "react";
import { Outlet } from "react-router-dom";

function Doctor() {
  return (
    <div className="flex items-start w-full h-full overflow-y-auto">
      <div className="w-full max-w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Doctor;
