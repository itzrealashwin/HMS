import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import axios from "axios";
import { URL } from "@base";

function Feedback() {
  // State to hold feedback data
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${URL}/api/admin/feedbacks`);
        setFeedbacks(response.data); // Update state with fetched feedbacks
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto gap-7 p-5">
      <h1 className="text-3xl font-semibold text-darkGreen dark:text-SidebarItemIcon">Feedback</h1>

      <div className="grid grid-cols-1 gap-5">
        {feedbacks.map((feedback, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="font-semibold text-darkGreen text-lg dark:text-neonGreen">
                {feedback.name}
              </CardTitle>
              <div className="flex items-center gap-1">
                <span className="text-mdDarkGreen font-semibold">
                  {feedback.rating}
                </span>
                <div className="flex">
                  {Array.from({ length: feedback.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-orange-500 fill-current" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p>
                <span className="font-semibold">Date:</span> {feedback.date}
              </p>
              <p>
                <span className="font-semibold">Feedback:</span> {feedback.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
