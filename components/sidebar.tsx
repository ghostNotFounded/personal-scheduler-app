"use client";

import { deleteCookie } from "@/lib/cookie";

import { CalendarIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import TimetableSwitcher from "./timetable-switcher";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/apiHandler";
import { Timetable } from "@/types";
import { Calendar } from "@/components/ui/calendar";

const Sidebar = () => {
  const router = useRouter();

  const params = useParams();

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

  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-5 flex flex-col justify-between min-w-max">
      <div className="space-y-5 text-md">
        <Link
          href={"/app/profile"}
          className="flex justify-between items-center glass"
        >
          <div className="flex space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Pl</AvatarFallback>
            </Avatar>

            <h6 className="text-sm w-max flex flex-col">
              <span>Arsheya Singh Parmar</span>
              <span className="font-light text-neutral-300">
                Fellow BITSian
              </span>
            </h6>
          </div>

          <div className="bg-black p-3 rounded-full">
            <CalendarIcon className="w-5 h-5" />
          </div>
        </Link>

        <div className="flex justify-between items-center glass">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>

        <div className="glass">Next event</div>

        <div className="glass">Add other functionality</div>

        <div className="flex justify-between items-center glass text-sm">
          <h1>
            Select <br />
            timetable
          </h1>
          <h1> -&gt;</h1>
          <TimetableSwitcher items={timetables} className="rounded-[0.75rem]" />
        </div>
      </div>

      <div className="text-sm text-neutral-400 glass">
        <p
          className="flex items-center space-x-2 cursor-pointer hover:text-destructive duration-200 ease-in"
          onClick={signOut}
        >
          <ExitIcon /> <span>Logout</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
