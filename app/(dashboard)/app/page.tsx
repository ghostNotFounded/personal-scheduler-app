"use client";

import { fetchData } from "@/lib/fetchData";
import { Timetable } from "@/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const AppPage = () => {
  const [timetables, setTimetables] = useState<Timetable[]>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData("/timetables");
        setTimetables(res as Timetable[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
    setIsMounted(true);
  }, []);

  if (timetables && timetables.length > 0) {
    redirect(`/app/${timetables[0]._id}`);
  }

  if (!isMounted) return null;

  return (
    <section className="flex items-center justify-center h-screen">
      AppPage
    </section>
  );
};

export default AppPage;
