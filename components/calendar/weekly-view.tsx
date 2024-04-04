"use client";

import { fetchData } from "@/lib/apiHandler";
import { getDaysFromWeekNumber } from "@/lib/get-days";
import { extractEventInfo } from "@/lib/handleEvents";
import { useEventStore } from "@/stores/events-store";
import { EventDetail } from "@/types";

import { CalendarIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WeeklyView = ({ week }: { week: number }) => {
  const iterations = 24;

  const params = useParams();
  const [events, setEvents] = useState<EventDetail[]>();

  const setEventsInStore = useEventStore((state) => state.setEvents);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const extension = `/timetables/${params.timetableId}/events`;
        const res = await fetchData(extension);

        if (res && Array.isArray(res)) {
          const formattedEvents = res.map((event) => extractEventInfo(event));

          setEventsInStore(formattedEvents);

          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error(error);

        toast.error("Token expired");
      }
    };

    getEvents();
  }, [params.timetableId]);

  const days = getDaysFromWeekNumber(week);

  const router = useRouter();
  const pathname = usePathname();

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

      <div className="flex absolute top-12 w-[calc(100%-5rem)] h-[144rem]">
        <CalendarIcon width={25} height={25} className="text-transparent" />

        <div className="grid grid-cols-7 gap-10 w-full ml-10 select-none">
          {days.map((day, idx) => {
            const filtered = events?.filter(
              (event) => event.startDayNumber === day.dayNumber
            );

            let j = 0;

            let divs: ReactElement[] = [];

            const colors = ["#3a0ca3", "#7209b7", "#f72585"];

            filtered?.map((event, idx) => {
              divs.push(
                <div
                  onClick={() => router.push(pathname + `/event/${event._id}`)}
                  key={idx}
                  className="group relative rounded-xl p-5 text-white cursor-pointer"
                  style={{
                    background: `${
                      colors[Math.floor(Math.random() * colors.length)]
                    }`,
                    gridRow: `span ${event.difference} / span ${event.difference}`,
                    gridRowStart: `${event.row}`,
                  }}
                >
                  <h1 className="font-semibold">{event.name}</h1>
                  <p className="text-xs font-light">
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
              );
            });

            return (
              <div key={idx} className="grid grid-rows-96 gap-1">
                {divs.map((ele) => ele)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;
