import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Edit, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useAppointmentContext from "@/custom/pages/Hooks/useAppointmentContext";
function ActionButton({ appId }) {
  const { deleteAppointments } = useAppointmentContext();

  // console.log(appId);

  function handleDelete() {
    deleteAppointments( appId );

  }
  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <NavLink to="editAppointment" state={{ appId }}>
            <DropdownMenuItem className="flex items-center justify-around">
              <div className="w-full flex flex-row gap-3">
                <div>
                  <Edit className="text-mdDarkGreen cursor-pointer" />
                </div>
                <div>Edit</div>
              </div>
            </DropdownMenuItem>
          </NavLink>
          <DropdownMenuItem
            asChild
            className="flex items-center content-center justify-center"
          >
            <AlertDialog className="w-full flex flex-row  gap-3">
              <AlertDialogTrigger
                modal="false"
                className=" p-2 text-sm w-full items-center  flex flex-row gap-3"
              >
                <Trash2 className="text-red-800" />
                <div>Delete</div>
              </AlertDialogTrigger>
              <AlertDialogContent className="b">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-darkGreen ">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    Appoinment.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-700 hover:bg-red-900"
                    onClick={handleDelete}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ActionButton;


