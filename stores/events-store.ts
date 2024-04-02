import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { EventDetail } from "@/types";

interface EventStoreProps {
  events: EventDetail[];
  setEvents: (data: EventDetail[]) => void;
  extendEvents: (
    data: EventDetail[] | ((prevEvents: EventDetail[]) => EventDetail[])
  ) => void;
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
  extendEvents: (data) => {
    set((prevState) => {
      if (typeof data === "function") {
        return { ...prevState, events: data(prevState.events) };
      } else {
        return { ...prevState, events: [...prevState.events, ...data] };
      }
    });
  },
});

export const useEventStore = create(
  devtools(
    persist(eventStore, {
      name: "events",
    })
  )
);
