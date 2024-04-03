"use client";

import { deleteCookie } from "@/lib/cookie";

import { CalendarIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import TimetableSwitcher from "./timetable-switcher";
import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { useTimetableStore } from "@/stores/timetable-store";
import GlowCard from "./glow-card";
import { useEventStore } from "@/stores/events-store";
import { fetchData } from "@/lib/apiHandler";

const Sidebar = () => {
  const router = useRouter();

  const signOut = async () => {
    await deleteCookie();

    router.push("/login");
  };

  const [date, setDate] = useState<Date | undefined>(new Date());

  const params = useParams();
  const setEventsInStore = useEventStore((state) => state.setEvents);

  useEffect(() => {
    const getEvents = async () => {
      const extension = `/timetables/${params.timetableId}/events/`;
      const res = await fetchData(extension);

      setEventsInStore(res);
    };

    getEvents();
  }, [params.timetableId]);

  return (
    <div className="p-5 h-full flex flex-col justify-between min-w-max">
      <div className="space-y-5 text-md">
        <GlowCard>
          <Link
            href={"/app/profile"}
            className="flex justify-between items-center"
          >
            <div className="flex space-x-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Pl</AvatarFallback>
              </Avatar>

              <h6 className="text-sm w-max flex flex-col">
                <span>Arsheya Singh Parmar</span>
                <span className="font-light">Fellow BITSian</span>
              </h6>
            </div>

            <div className="bg-black p-3 rounded-full">
              <CalendarIcon className="w-5 h-5" />
            </div>
          </Link>
        </GlowCard>

        <GlowCard>
          <div className="flex justify-between items-center">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </GlowCard>

        <GlowCard>
          <div className="flex justify-between items-center text-sm z-20 relative">
            <h1>
              Select <br />
              timetable
            </h1>
            <h1> -&gt;</h1>
            <TimetableSwitcher
              items={useTimetableStore((state) => state.timetables)}
              className="rounded-[0.75rem]"
            />
          </div>
        </GlowCard>
      </div>

      <GlowCard>
        <div className="text-sm text-neutral-400">
          <p
            className="flex items-center space-x-2 cursor-pointer hover:text-destructive duration-200 ease-in"
            onClick={signOut}
          >
            <ExitIcon /> <span>Logout</span>
          </p>
        </div>
      </GlowCard>
    </div>
  );
};

export default Sidebar;
