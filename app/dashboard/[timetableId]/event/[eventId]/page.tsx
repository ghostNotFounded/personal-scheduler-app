"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

import Model from "@/components/model";

import { useEventStore } from "@/stores/events-store";

const EventPage = ({
  params,
}: {
  params: { timetableId: string; eventId: string };
}) => {
  const events = useEventStore((state) => state.events);

  const event = events.filter((e) => e._id === params.eventId)[0];

  const router = useRouter();

  return (
    <section className="space-y-5 h-screen flex flex-col justify-between">
      <h1 className="text-4xl font-bold">{event.name}</h1>
      <p>
        {event.name} starts at {format(event.startDate, "PPP")} at{" "}
        {event.startTime}
      </p>
      <p className="text-xs text-neutral-800">
        I rlly dont have any other details to show
      </p>

      <div className="h-[75vh]">
        <Model />
      </div>

      <p
        onClick={() => router.back()}
        className="group cursor-pointer min-h-full"
      >
        &lt; <span className="group-hover:underline">Go back</span>
      </p>
    </section>
  );
};

export default EventPage;
