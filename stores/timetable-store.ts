import { Timetable } from "@/types";
import { create } from "zustand";

interface timetableStoreProps {
  timetables: Timetable[];
}

export const timetableStore = create<timetableStoreProps>((set) => ({
  timetables: [],
}));
