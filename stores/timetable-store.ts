import { create } from "zustand";
import { Timetable } from "@/types";

interface TimetableStoreProps {
  timetables: Timetable[];
  setTimetables: (data: Timetable[]) => void;
}

export const useTimetableStore = create<TimetableStoreProps>((set) => ({
  timetables: [],
  setTimetables: (data) => {
    set({ timetables: [...data] });
  },
}));
