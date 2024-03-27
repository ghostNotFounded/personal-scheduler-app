"use client";

import { SidebarMenuItems } from "@/constants";
import { deleteCookie } from "@/lib/cookie";
import { cn } from "@/lib/utils";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const signOut = async () => {
    await deleteCookie();

    router.push("/login");
  };

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
