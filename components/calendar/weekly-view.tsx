"use client";

import { fetchData } from "@/lib/apiHandler";
import { getDays } from "@/lib/get-days";
import { extractEventInfo } from "@/lib/handleEvents";
import { useEventStore } from "@/stores/events-store";
import { EventDetail } from "@/types";

import { CalendarIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

const WeeklyView = () => {
  const iterations = 24;

  const params = useParams();
  const [events, setEvents] = useState<EventDetail[]>();

  const getEventsFromStore = useEventStore((state) => {
    return state.events;
  });

  const setEventsInStore = useEventStore((state) => state.setEvents);

  useEffect(() => {
    const getEvents = async () => {
      const extension = `/timetables/${params.timetableId}/events`;
      const res = await fetchData(extension);

      if (res && Array.isArray(res)) {
        const formattedEvents = res.map((event) => extractEventInfo(event));
        console.log(formattedEvents);

        setEventsInStore(formattedEvents);

        setEvents(formattedEvents);
      }
    };

    getEvents();
  }, [params.timetableId]);

  console.log({ events });

  const days = getDays();

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

            const colors = [
              "#b9d7fc",
              "#c4acfb",
              "#fff",
              "#9fefc1",
              "#f7d38a",
              "#f9aad6",
            ];
            let colorsIdx = 0;

            filtered?.map((event, idx) => {
              divs.push(
                <div
                  onClick={() => router.push(pathname + `/event/${event._id}`)}
                  key={idx}
                  className="rounded-xl p-5 m-1 text-white cursor-pointer"
                  style={{
                    background: `${colors[idx]}`,
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

              if (idx >= colors.length) {
                idx = 0;
              } else {
                idx++;
              }
            });

            return (
              <div key={idx} className="grid grid-rows-96">
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
