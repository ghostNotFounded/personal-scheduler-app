"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const HomePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="px-20 py-10 grid grid-cols-3 gap-10 h-screen overflow-hidden w-full">
      <div className="space-y-10">
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold">Calendar</h1>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-purple-400 text-purple-400 w-full"
          />
        </div>

        <div className="space-y-5 border border-purple-400 rounded-t-md h-full p-5">
          <h1 className="text-xl font-semibold text-purple-400">
            Upcoming Events
          </h1>
        </div>
      </div>

      <div className="col-span-2 space-y-5">
        <h1 className="text-4xl font-semibold">Today's Schedule</h1>
        <div className="border-t border-x border-purple-400 rounded-t-md w-full h-full"></div>
      </div>
    </div>
  );
};

export default HomePage;
