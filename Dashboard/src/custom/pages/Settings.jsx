import React, { useContext, useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LogOut } from "lucide-react";
import { adminLoginContext } from '../context/admins/adminLogin';

function Settings() {
  // Initialize dark mode state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const { Logout } = useContext(adminLoginContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Update localStorage when dark mode state changes
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    Logout();
  };

  return (
    <div className="flex items-center justify-center h-full overflow-hidden">
      <Card className="w-full max-w-md p-6 shadow-md rounded-lg bg-white dark:bg-gray-800">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">Settings</h2>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
                className="data-[state=checked]:bg-green-600"
              />
              <Label htmlFor="dark-mode" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Dark Mode
              </Label>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-600 duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Settings;
