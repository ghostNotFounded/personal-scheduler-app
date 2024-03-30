"use client";

import { getDays } from "@/lib/get-days";
import { useEventStore } from "@/stores/events-store";

import { EventDetail as OriginalEventDetail } from "@/types";
import { CalendarIcon } from "lucide-react";

interface EventDetail extends OriginalEventDetail {
  startDate: string;
  endDate: string;
  gridPosition: {
    row: number;
    col: number;
  };
}

const WeeklyView = () => {
  const iterations = 24;

  const events = useEventStore((state) => state.events);

  return (
    <div className="relative bg-neutral-200 p-10 border-t border-neutral-300 overflow-y-auto">
      <div className="space-y-20 min-w-full ">
        {Array.from({ length: iterations }, (_, index) => (
          <div key={index} className="flex items-center space-x-5">
            <p className="text-xs min-w-max">
              {(index + 1) % 12 ? (index + 1) % 12 : "12"}{" "}
              {index + 1 > 12 ? "pm" : "am"}
            </p>
            <hr className="h-[2px] w-full bg-neutral-300 border-0 rounded" />
          </div>
        ))}
      </div>

      <div className="flex absolute top-12 w-[calc(100%-5rem)] h-[138rem]">
        <CalendarIcon width={25} height={25} className="text-transparent" />

        <div className="grid grid-cols-7 gap-10 w-full ml-10 select-none"></div>
      </div>
    </div>
  );
};

export default WeeklyView;

const EventCard = ({ event }: { event: EventDetail }) => {
  return (
    <div
      className={`bg-purple-400 rounded-lg text-white p-5 text-sm flex flex-col space-y-2`}
    >
      <span className="font-semibold">{event.name}</span>
      <span>
        {event.startTime} - {event.endTime}
      </span>
    </div>
  );
};
