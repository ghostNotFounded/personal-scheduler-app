"use client";

import NewTimetableCard from "@/components/dashboard/new-timetable-card";
import { fetchData } from "@/lib/apiHandler";
import { useTimetableStore } from "@/stores/timetable-store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    const setTimetables = async () => {
      const data = await fetchData("/timetables");
      setTimetablesInStore(data);
    };

    setTimetables();
  }, []);

  const setTimetablesInStore = useTimetableStore(
    (state) => state.setTimetables
  );
  const timetables = useTimetableStore((state) => state.timetables);

  if (timetables.length > 0) redirect(`/dashboard/${timetables[0]._id}`);

  return (
    <section className="flex items-center justify-center h-screen">
      <NewTimetableCard />
    </section>
  );
};

export default DashboardPage;
