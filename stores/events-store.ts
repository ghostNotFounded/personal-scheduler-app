import { create } from "zustand";
import { EventDetail } from "@/types";

interface EventStoreProps {
  events: EventDetail[];
  setEvents: (data: EventDetail[]) => void;
}

export const useTimetableStore = create<EventStoreProps>((set) => ({
  events: [],
  setEvents: (data) => {
    set({ events: [...data] });
  },
}));
