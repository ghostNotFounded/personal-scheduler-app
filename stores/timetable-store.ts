import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { Timetable } from "@/types";

interface TimetableStoreProps {
  timetables: Timetable[];
  setTimetables: (data: Timetable[]) => void;
}

const timetableStore = (
  set: (
    fn: (prevState: TimetableStoreProps) => TimetableStoreProps,
    replace?: boolean
  ) => void
): TimetableStoreProps => ({
  timetables: [],
  setTimetables: (data) => {
    set((prevState) => ({ ...prevState, timetables: [...data] }));
  },
});

export const useTimetableStore = create(
  devtools(
    persist(timetableStore, {
      name: "timetables",
    })
  )
);
