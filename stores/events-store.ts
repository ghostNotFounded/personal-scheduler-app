import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { EventDetail } from "@/types";

interface EventStoreProps {
  events: EventDetail[];
  setEvents: (data: EventDetail[]) => void;
}

const eventStore = (
  set: (
    fn: (prevState: EventStoreProps) => EventStoreProps,
    replace?: boolean
  ) => void
): EventStoreProps => ({
  events: [],
  setEvents: (data) => {
    set((prevState) => ({ ...prevState, events: [...data] }));
  },
});

export const useEventStore = create(
  devtools(
    persist(eventStore, {
      name: "events",
    })
  )
);
