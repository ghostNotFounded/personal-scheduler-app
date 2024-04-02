"use client";

import Sidebar from "@/components/sidebar";

import { EventDetail as OriginalEventDetail } from "@/types";

interface EventDetail extends OriginalEventDetail {
  startDate: string;
  endDate: string;
  gridPosition: {
    row: number;
    col: number;
  };
}

const DashboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { timetableId: string };
}) => {
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
