"use client";

import { fetchData } from "@/lib/apiHandler";
import { extractEventInfo } from "@/lib/handleEvents"; // Import extractEventInfo
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { EventDetail as OriginalEventDetail } from "@/types";

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

  const params = useParams();

  const [events, setEvents] = useState<EventDetail[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData(`/timetables/${params.timetableId}/events`);

        if (res && Array.isArray(res)) {
          const formattedEvents = res.map((event) =>
            extractEventInfo(event as EventDetail)
          );
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [params.timetableId]);

  return (
    <div className="relative bg-neutral-200 p-10 border-t border-neutral-300 overflow-y-auto">
      <div className="">
        <div className="space-y-20 min-w-full ">
          {Array.from({ length: iterations }, (_, index) => (
            <div key={index} className="flex items-center space-x-10">
              <p className="text-xs min-w-max">
                {(index + 1) % 12 ? (index + 1) % 12 : "12"}{" "}
                {index + 1 > 12 ? "pm" : "am"}
              </p>
              <hr className="h-[2px] w-full bg-neutral-300 border-0 rounded" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 grid-rows-24 gap-x-10 w-[calc(100%-10rem)] ml-10 absolute top-12 left-16">
          {events !== null ? (
            events.map((event, idx) => <EventCard event={event} key={idx} />)
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;

const EventCard = ({ event }: { event: EventDetail }) => {
  const { name, startTime, endTime, gridPosition } = event;

  // Calculate Tailwind CSS grid area value
  const gridArea = `${gridPosition.row + 1} / ${gridPosition.col + 1}`;

  // Calculate Tailwind CSS grid row span to adjust the height of the card
  const gridRowSpan = 1; // Adjust as needed

  return (
    <div
      className={`bg-purple-400 rounded-3xl text-white p-5 text-sm flex flex-col space-y-2`}
      style={{ gridArea }}
    >
      <span className="font-semibold">{name}</span>
      <span>
        {startTime} - {endTime}
      </span>
    </div>
  );
};
