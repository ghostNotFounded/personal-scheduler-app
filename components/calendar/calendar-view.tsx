"use client";

import { Timetable, WeekDayInfo } from "@/types";
import { cn } from "@/lib/utils";
import { CalendarIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { getDays } from "@/lib/get-days";

import WeeklyView from "@/components/calendar/weekly-view";
import { useEventStore } from "@/stores/events-store";
import { deleteData } from "@/lib/apiHandler";
import { useParams, useRouter } from "next/navigation";
import { useTimetableStore } from "@/stores/timetable-store";

import { useEffect, useState } from "react";
import Link from "next/link";

const CalendarView = () => {
  // Get the days of the current weeek
  const currWeek: WeekDayInfo[] = getDays();

  // Get params
  const params = useParams();

  // Extract the ongoing month and year
  const currentDate = new Date();
  const monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });
  const currentMonth = monthFormatter.format(currentDate);
  const currentYear = currentDate.getFullYear().toString();

  // Getting events of timetable
  // TODO: Shift into useEffect
  const events = useEventStore((state) => state.events);

  // Setting timetable on updating params
  const [timetables, setTimetables] = useState<Timetable[] | never[]>([]);
  const [timetable, setTimetable] = useState<Timetable | undefined>();
  const getTimetablesFromStore = useTimetableStore((state) => {
    return state.timetables;
  });

  useEffect(() => {
    setTimetables(getTimetablesFromStore);

    if (timetables.length > 0) {
      const currentTimetable = timetables.find(
        (timetable: Timetable) => timetable._id === params.timetableId
      );

      if (currentTimetable) {
        setTimetable(currentTimetable);
      } else {
        router.push(`/dashboard/${timetables[0]._id}`);
      }
    }
  }, [params.timetableId, getTimetablesFromStore, timetables]);

  // Declaring router
  const router = useRouter();

  const setTimetablesInStore = useTimetableStore(
    (state) => state.setTimetables
  );

  const handleDelete = async () => {
    await deleteData("timetables", params.timetableId as string);

    const filtered = timetables.filter(
      (timetable) => timetable._id !== params.timetableId
    );
    setTimetablesInStore(filtered);

    if (filtered.length === 0) {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard/${filtered[0]._id}`);
    }
  };

  return (
    <div className="bg-white text-neutral-950 h-full rounded-2xl overflow-hidden flex flex-col scroll-smooth min-w-max">
      <div className="px-10 py-5 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            {currentMonth}, {currentYear}
          </h1>

          <h1 className="text-3xl font-bold">{timetable?.name}</h1>

          <div className="flex gap-5">
            <div
              onClick={handleDelete}
              className="flex px-4 py-2 bg-destructive hover:brightness-90 cursor-pointer transition duration-300 ease-in rounded-lg items-center text-white font-semibold space-x-2"
            >
              <TrashIcon /> <span>Delete Timetable</span>
            </div>
            <Link
              href={`/dashboard/${params.timetableId}/create-event`}
              className="flex px-4 py-2 bg-emerald-700 hover:brightness-90 cursor-pointer transition duration-300 ease-in rounded-lg items-center text-white font-semibold space-x-2"
            >
              <PlusIcon /> <span>Add event</span>
            </Link>
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
