"use client";

import NewTimetableCard from "@/components/dashboard/new-timetable-card";
import { timetableStore } from "@/stores/timetable-store";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const timetables = timetableStore((state) => state.timetables);

  if (timetables.length > 0) redirect(`/dashboard/${timetables[0]._id}`);

  return (
    <section className="flex items-center justify-center h-screen">
      <NewTimetableCard />
    </section>
  );
};

export default DashboardPage;
