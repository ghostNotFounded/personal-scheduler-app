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
  const [timetable, setTimetable] = useState<Timetable>();

  useEffect(() => {
    checkTokenExpiry();

    try {
      // @ts-ignore
      const data: Timetable = fetchData(`/timetables/${params.timetableId}`);
      setTimetable(data);
    } catch (error) {
      console.log("Error occured while fetching data: ", error);
    }
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
