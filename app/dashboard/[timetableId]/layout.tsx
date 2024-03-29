import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
