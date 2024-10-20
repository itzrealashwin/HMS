import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useDashboardContext from "@/custom/pages/Hooks/useDashboardContext";
import { ArrowLeft, ArrowRight, CalendarCogIcon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

function WACount() {
  const { WaData, WACountByDate, customRange } = useDashboardContext();

  // State to manage the current data being displayed
  const [currentWeek, setCurrentWeek] = useState("PreviousWeek");
  const [date, setDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Function to handle week change based on arrow click
  const handleWeekChange = (direction) => {
    if (direction === "right") {
      if (currentWeek === "PreviousToPreviousWeek")
        setCurrentWeek("PreviousWeek");
      else if (currentWeek === "PreviousWeek") setCurrentWeek("CurrentWeek");
    } else {
      if (currentWeek === "CurrentWeek") setCurrentWeek("PreviousWeek");
      else if (currentWeek === "PreviousWeek")
        setCurrentWeek("PreviousToPreviousWeek");
    }
  };

  // Function to reset the date selection
  const handleResetDate = () => {
    setDate(null); // Clear the date
  };

  // Calculate date range for the current displayed week
  const getWeekRange = () => {
    const weekData = date ? customRange : WaData[currentWeek];
    return weekData?.weekname || "";
  };

  // Data for the chart
  const chartData = date ? customRange : WaData[currentWeek] || {};
  const data = [
    chartData.monday || 0,
    chartData.tuesday || 0,
    chartData.wednesday || 0,
    chartData.thursday || 0,
    chartData.friday || 0,
    chartData.saturday || 0,
  ];

  const total = data.reduce((acc, value) => acc + value, 0);
  const isDataSufficient = data.some((value) => value > 0);

  const handleDateSelect = (selectedDate) => {
    // Convert the selected date to 'YYYY-MM-DD' format

    const formattedDate = selectedDate.toLocaleDateString('en-CA'); // Formats as YYYY-MM-DD
    setDate(formattedDate);
    
    WACountByDate(formattedDate);
    setIsCalendarOpen(false);
    
  };

  return (
    <Card className="shadow-md w-full lg:w-[50%] h-[24rem] flex flex-col justify-between items-center">
      <CardHeader className="w-full">
        <CardTitle className="text-lg w-full dark:text-neonGreen text-green-950">
          <div className="flex w-full items-center justify-center">
            <div className="flex text-md text-mdDarkGreen gap-2 flex-col text-nowrap w-full">
              <span>Weekly Appointments</span>
              <span className="text-zinc-500 flex gap-3 w-fit items-center text-sm font-normal">
                <span className="flex w-fit text-nowrap">{getWeekRange()}</span>
                <div className="flex justify-around w-fit">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCalendarOpen(true)}
                      >
                        <CalendarCogIcon size={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2 flex items-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {date && (
                    <Button variant="ghost" size="sm" onClick={handleResetDate}>
                      <XIcon size={20} />
                    </Button>
                  )}
                </div>
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              <span className="text-2xl dark:text-neonGreen px-5 text-mdDarkGreen">
                {isDataSufficient ? total : 0}
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="flex justify-between w-full px-4">
        <button
          onClick={() => handleWeekChange("left")}
          disabled={currentWeek === "PreviousToPreviousWeek" || date !== null}
          className={`text-mdDarkGreen py-2 flex dark:text-neonGreen ${
            currentWeek === "PreviousToPreviousWeek" || date !== null
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <ArrowLeft /> Previous
        </button>
        <button
          onClick={() => handleWeekChange("right")}
          disabled={currentWeek === "CurrentWeek" || date !== null}
          className={`text-mdDarkGreen py-2 flex dark:text-neonGreen ${
            currentWeek === "CurrentWeek" || date !== null
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next <ArrowRight />
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center w-full min-h-[16rem] p-4">
        <BarChart
          className="w-full"
          xAxis={[
            {
              scaleType: "band",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              colorMap: {
                type: "ordinal",
                colors: ["#2D6A4F"],
              },
            },
          ]}
          leftAxis={null}
          slots={{
            axisLine: "none",
          }}
          grid={{
            horizontal: true,
          }}
          borderRadius={10}
          bottomAxis={{
            disableTicks: true,
          }}
          series={[
            {
              data: data,
            },
          ]}
          width={500}
          height={200}
          margin={{
            top: 0,
            bottom: 50,
            right: 0,
            left: 0,
          }}
        />
      </div>
    </Card>
  );
}

export default WACount;
