"use client";

import { useState } from "react";

import { WeekDayInfo } from "@/types";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { getDays } from "@/lib/get-days";

import WeeklyView from "@/components/calendar/weekly-view";
import { useEventStore } from "@/stores/events-store";

const CalendarView = () => {
  const tabs = ["Month", "Week", "Day"];
  const [selectedTab, setSelectedTab] = useState("Week");

  const currWeek: WeekDayInfo[] = getDays();

  const currentDate = new Date();

  const monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });
  const currentMonth = monthFormatter.format(currentDate);

  const currentYear = currentDate.getFullYear().toString();

  const events = useEventStore((state) => state.events);

  return (
    <div className="bg-white text-neutral-950 h-full rounded-2xl overflow-hidden flex flex-col scroll-smooth min-w-max">
      <div className="px-10 py-5 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {currentMonth}, {currentYear}
          </h1>

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

          <div className="grid grid-cols-7 gap-10 w-full ml-10 select-none">
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

      {events ? <WeeklyView /> : "Nothing found :/"}
    </div>
  );
};

export default CalendarView;
