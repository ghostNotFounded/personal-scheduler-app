"use client";

import Sidebar from "@/components/sidebar";
import { fetchData } from "@/lib/fetchData";
import { checkTokenExpiry } from "@/lib/tokenExpired";
import { Timetable } from "@/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { timetableId: string };
}) {
  const [timetables, setTimetables] = useState<Timetable[]>();

  useEffect(() => {
    checkTokenExpiry();

    const fetchDataAndUpdateState = async () => {
      try {
        const data: Timetable[] = await fetchData("/timetables");
        setTimetables(data);

        // Check if current params id is within the fetched timetables
        if (!data.some((timetable) => timetable._id === params.timetableId)) {
          console.log("Current timetable ID:", params.timetableId);
          console.log("Fetched timetables:", data);
          redirect("/app");
        }
      } catch (error) {
        console.error("Error occurred while fetching data: ", error);
      }
    };

    fetchDataAndUpdateState();
  }, [params.timetableId]);

  return (
    <main
      className={`flex bg-neutral-950 text-white h-screen w-screen overflow-hidden`}
    >
      <Sidebar />
      {children}
    </main>
  );
}
