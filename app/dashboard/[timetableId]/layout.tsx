"use client";

import Sidebar from "@/components/sidebar";
import { fetchData } from "@/lib/apiHandler";
import { useTimetableStore } from "@/stores/timetable-store";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData("/timetables");

        useTimetableStore((state) => state.setTimetables(res));

        console.log(useTimetableStore((state) => state.timetables));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <main className="flex h-screen overflow-hidden">
      <header>
        <Sidebar />
      </header>

      <section className="w-full p-5">{children}</section>
    </main>
  );
};

export default DashboardLayout;
