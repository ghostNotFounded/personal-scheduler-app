"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

import Model from "@/components/model";

import { useState } from "react";

import { useEventStore } from "@/stores/events-store";
import { TrashIcon } from "lucide-react";
import { deleteData } from "@/lib/apiHandler";
import AlertModal from "@/components/modals/alert-modal";
import toast from "react-hot-toast";

const EventPage = ({
  params,
}: {
  params: { timetableId: string; eventId: string };
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const events = useEventStore((state) => state.events);

  const event = events.filter((e) => e._id === params.eventId)[0];

  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteData(
        `timetables/${params.timetableId}/events/${params.eventId}`
      );

      toast.success("Event deleted successfully");

      router.back();
    } catch (error) {
      toast.error("Something went wrong");
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
            onClick={() => setOpen(true)}
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
          &lt;- <span className="group-hover:underline">Go back</span>
        </p>
      </section>
    </>
  );
};

export default EventPage;
