import React, { useContext } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitHistoryContext } from "@/custom/context/dashboard/VisitHistoryContext";
import { PieChart } from "@mui/x-charts";

const Legend = ({ data, colors }) => (
  <div className="flex justify-center flex-col items-start gap-2 flex-wrap mt-4">
    {data.map((item, index) => (
      <div key={index} className="flex items-center">
        <div
          className="w-3.5 h-3.5 rounded-full mr-2"
          style={{
            backgroundColor: colors[index],
          }}
        ></div>
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

function VisitHistory() {
  const { visitHistoryData } = useContext(VisitHistoryContext);

  const pieData = visitHistoryData
    ? Object.entries(visitHistoryData).map(([label, value], index) => ({
        id: index,
        value: value || 0,
        label,
      }))
    : [];

  const filteredPieData = pieData.filter((item) => item.value > 0);

  const colors = [
    "#94E5D3",
    "#2A9D90",
    "#2D6A4F",
    "#56B4D3",
    "#B5E48C",
    "#76C893",
    "#52B69A",
    "#34A0A4",
    "#168AAD",
    "#1A759F",
  ];

  const filteredColors = filteredPieData.map(
    (_, index) => colors[index % colors.length]
  );

  const totalVisits = filteredPieData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <Card className="shadow-md px-1 w-full gap-0 lg:w-[50%] h-[24rem] flex flex-col justify-between items-center py-0">
      <CardHeader className="w-full h-full p-4">
        <CardTitle className="text-lg w-full dark:text-neonGreen text-green-950">
          <div className="flex w-full items-center justify-center">
            <div className="flex text-md text-mdDarkGreen flex-col w-full">
              <span>Today's Visits</span>
              <span className="text-zinc-500 text-sm font-normal">
                {totalVisits > 0
                  ? "Today's Total Visitors are following"
                  : "No sufficient data available"}
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              <span className="text-2xl dark:text-neonGreen px-5 text-mdDarkGreen">
                {totalVisits}
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {totalVisits > 0 ? (
        <div className="flex h-fulls w-full justify-between items-center p-4">
          <PieChart
            colors={filteredColors}
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            series={[
              {
                data: filteredPieData.length
                  ? filteredPieData
                  : [{ id: 0, value: 1, label: "No Data" }],
                innerRadius: 50,
                outerRadius: 100,
                paddingAngle: 0,
                cornerRadius: 0,
                startAngle: -180,
                endAngle: 180,
              },
            ]}
            width={350}
            height={200}
            sx={{
              padding: "0",
              width: "fit-content",
            }}
            margin={{ right: 0 }}
          />
          <Legend data={filteredPieData} colors={filteredColors} />
        </div>
      ) : (
        <div className="text-center text-gray-500 p-6">
          No sufficient data available
        </div>
      )}
    </Card>
  );
}

export default VisitHistory;
