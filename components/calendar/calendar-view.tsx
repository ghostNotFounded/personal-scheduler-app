"use client";

import { getDays } from "@/lib/get-days";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import WeeklyView from "./weekly-view";

const CalendarView = () => {
  const tabs = ["Month", "Week", "Day"];
  const [selectedTab, setSelectedTab] = useState("Week");

  const currWeek = getDays();

  return (
    <div className="bg-white text-neutral-950 h-full rounded-2xl overflow-hidden flex flex-col">
      <div className="px-10 py-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">December, 2023</h1>

          <div className="grid gap-1 px-1 grid-cols-3 bg-neutral-200 rounded-lg h-10 w-80 items-center">
            {tabs.map((tab, idx) => {
              const isActive = selectedTab === tab;

              return (
                <p
                  key={idx}
                  className={cn(
                    "text-center font-medium rounded-md py-1 cursor-pointer transition",
                    isActive ? "bg-white font-semibold" : ""
                  )}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </p>
              );
            })}
          </div>
        </div>

        <div className="flex items-center mt-10">
          <CalendarIcon width={25} height={25} />

          <div className="grid grid-cols-7 gap-10 w-full ml-10">
            {currWeek.map((day, idx) => {
              return (
                <div
                  key={idx}
                  className={cn(
                    "p-4 h-24 rounded-xl flex flex-col items-center justify-between pointer-none transition",
                    day.today ? "bg-black text-white" : "bg-neutral-200"
                  )}
                >
                  <span>{day.dayName}</span>
                  <span className="text-3xl font-extrabold">
                    {day.dayNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <WeeklyView />
    </div>
  );
};

export default CalendarView;
