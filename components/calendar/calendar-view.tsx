"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { CalendarIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

import { Timetable, WeekDayInfo } from "@/types";
import { useTimetableStore } from "@/stores/timetable-store";
import { deleteData } from "@/lib/apiHandler";
import { cn } from "@/lib/utils";
import { getDaysFromWeekNumber } from "@/lib/get-days";

import WeeklyView from "@/components/calendar/weekly-view";
import AlertModal from "@/components/modals/alert-modal";
import { getMonthFromWeekNumber, getWeekNumber } from "@/lib/use-week";

const CalendarView = () => {
  // Declaring router
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [week, setWeek] = useState<number>(getWeekNumber);
  const increaseWeek = () => {
    if (week < 53) {
      setWeek((prevWeek) => prevWeek + 1);
    }
  };
  const decreaseWeek = () => {
    if (week > 1) {
      setWeek((prevWeek) => prevWeek - 1);
    }
  };

  const currWeek: WeekDayInfo[] = getDaysFromWeekNumber(week);

  // Get params
  const { timetableId } = useParams();

  // Extract the ongoing month and year
  const currentDate = new Date();
  const currentMonth = getMonthFromWeekNumber(week);
  const currentYear = currentDate.getFullYear().toString();

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
        (timetable: Timetable) => timetable._id === timetableId
      );

      if (currentTimetable) {
        setTimetable(currentTimetable);
      } else {
        router.push(`/dashboard/${timetables[0]._id}`);
      }
    }
  }, [router, timetableId, getTimetablesFromStore, timetables]);

  const setTimetablesInStore = useTimetableStore(
    (state) => state.setTimetables
  );

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteData(`timetables/${timetableId}`);

      const filtered = timetables.filter(
        (timetable) => timetable._id !== timetableId
      );
      setTimetablesInStore(filtered);

      toast.success("Timetable deleted");

      if (filtered.length === 0) {
        router.push("/dashboard");
      } else {
        router.push(`/dashboard/${filtered[0]._id}`);
      }
    } catch (error) {
      toast.error("Some error occured");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />

      <div className="bg-white text-neutral-950 h-full rounded-2xl overflow-hidden flex flex-col scroll-smooth min-w-max">
        <div className="px-10 py-5 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold min-w-[200px]">
              {currentMonth}, {currentYear}
            </h1>

            <div className="flex space-x-5 justify-between items-center w-full max-w-md select-none">
              <h1 className="text-3xl font-bold min-w-[100px]">
                {timetable?.name}
              </h1>
              <div className="flex items-center text-xl space-x-2">
                <button onClick={decreaseWeek}>&lt;-</button>
                <span>W{week}</span>
                <button onClick={increaseWeek}>-&gt;</button>
              </div>
            </div>

            <div className="flex gap-5">
              <button
                disabled={loading}
                onClick={() => setOpen(true)}
                className="flex px-4 py-2 bg-destructive hover:brightness-90 cursor-pointer transition duration-300 ease-in rounded-lg items-center text-white font-semibold space-x-2"
              >
                <TrashIcon /> <span>Delete Timetable</span>
              </button>
              <button
                disabled={loading}
                onClick={() =>
                  router.push(`/dashboard/${timetableId}/create-event`)
                }
                className="flex px-4 py-2 bg-emerald-500 hover:brightness-90 cursor-pointer transition duration-300 ease-in rounded-lg items-center text-white font-semibold space-x-2"
              >
                <PlusIcon /> <span>Add event</span>
              </button>
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

        <WeeklyView week={week} />
      </div>
    </>
  );
};

export default CalendarView;
