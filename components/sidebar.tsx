"use client";

import { deleteCookie } from "@/lib/cookie";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  DashboardIcon,
  ExitIcon,
  GearIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import TimetableSwitcher from "./timetable-switcher";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/fetchData";
import { Timetable } from "@/types";

const Sidebar = () => {
  const router = useRouter();

  const signOut = async () => {
    await deleteCookie();

    router.push("/login");
  };

  const [timetables, setTimetables] = useState<Timetable[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData("/timetables");
        setTimetables(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const SidebarMenuItems = [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      href: "/app",
    },
    {
      icon: <CalendarIcon />,
      title: "Calendar",
      href: "/app/calendar",
    },
    {
      icon: <PlusCircledIcon />,
      title: "Create timetable",
      href: "/app/create-timetable",
    },
  ];

  return (
    <div className="bg-neutral-950 pl-10 pr-20 py-10 flex flex-col justify-between">
      <div className="space-y-10">
        <Link href={"/app"} className="flex items-center space-x-2">
          <Image src={"/Logo.svg"} width={25} height={25} alt="logo" />
          <h6 className="text-xl font-semibold tracking-wider">Plannr</h6>
        </Link>

        <div className="space-y-5 text-md">
          {SidebarMenuItems.map((item, idx) => {
            const pathName = usePathname();
            const isActive = item.href === pathName;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 hover:text-purple-400 duration-300 ease-in",
                  isActive ? "text-purple-400" : ""
                )}
              >
                {item.icon} <span className="w-max">{item.title}</span>
              </Link>
            );
          })}
        </div>

        <TimetableSwitcher items={timetables} />
      </div>

      <div className="space-y-10 text-sm text-neutral-400">
        <p className="flex items-center space-x-2 cursor-pointer hover:text-neutral-200 duration-200 ease-in">
          <GearIcon /> <span>Settings</span>
        </p>

        <p
          className="flex items-center space-x-2 cursor-pointer hover:text-neutral-200 duration-200 ease-in"
          onClick={signOut}
        >
          <ExitIcon /> <span>Logout</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
