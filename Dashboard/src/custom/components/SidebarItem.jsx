import { Settings } from "lucide-react";

import sidebarItems from "../utils/sidebaritem.js";
import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator.jsx";
function SidebarItem() {
  function handleRoute() {}
  return (
    <>
      <ul className={`flex justify-center items-center gap-10 flex-col h-full`}>
        {sidebarItems.map((sidebarItem) => {
          const IconComponent = sidebarItem.icon;
          console.log(sidebarItem.name);
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-SidebarItemBG rounded-md" : "rounded-md"
              }
              to={`/admin/${sidebarItem.name}`}
              key={sidebarItem.name}
            >
              <li
                className={`hover:bg-SidebarItemBG transition-all duration-200 md:px-9 px-4 py-2 rounded-lg flex gap-4 items-start justify-start md:w-52 `}
                onClick={handleRoute}
              >
                <span className={`w-6 text-SidebarItemIcon`}>
                  <IconComponent />
                </span>
                <span
                  className={`w-auto hidden justify-start font-medium md:flex`}
                >
                  {sidebarItem.name}
                </span>
              </li>
            </NavLink>
          );
        })}
        <Separator/>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-SidebarItemBG rounded-md" : "rounded-md"
          }
          to={`/admin/settings`}
        >
          <li
            className={`hover:bg-SidebarItemBG transition-all duration-200 md:px-9 px-4 py-2 rounded-lg flex gap-4 items-start justify-start md:w-52 mt-auto`}
          >
            <span className={`w-6 text-SidebarItemIcon`}>
              <Settings />
            </span>
            <span className={`w-auto hidden justify-start font-medium md:flex`}>
              Setting
            </span>
          </li>
        </NavLink>
      </ul>
    </>
  );
}

export default SidebarItem;
