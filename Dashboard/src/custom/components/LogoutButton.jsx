import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit, LogOut } from "lucide-react";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Edit className="text-mdDarkGreen" />
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2 mt-2">
            <LogOut className="text-red-800" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
