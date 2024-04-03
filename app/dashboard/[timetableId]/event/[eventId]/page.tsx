"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

import Model from "@/components/model";

import { useEventStore } from "@/stores/events-store";
import { TrashIcon } from "lucide-react";
import { deleteData } from "@/lib/apiHandler";

const EventPage = ({
  params,
}: {
  params: { timetableId: string; eventId: string };
}) => {
  const events = useEventStore((state) => state.events);

  const event = events.filter((e) => e._id === params.eventId)[0];

  const router = useRouter();

  const handleDelete = async () => {
    await deleteData(
      `timetables/${params.timetableId}/events/${params.eventId}`
    );

    router.back();
  };

  return (
    <section className="space-y-5 h-screen flex flex-col justify-between">
      <h1 className="text-4xl font-bold">{event.name}</h1>
      <div className="flex justify-between">
        <div>
          <p>
            {event.name} starts at {format(event.startDate, "PPP")} at{" "}
            {event.startTime}
          </p>
          <p className="text-xs text-neutral-800">
            I rlly dont have any other details to show
          </p>
        </div>

        <button
          className="bg-destructive text-semibold font-white flex rounded-md px-6 py-2 hover:brightness-75 transition duration-200 ease-in"
          onClick={handleDelete}
        >
          <TrashIcon className="mr-2" /> Delete event
        </button>
      </div>

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
