"use client";

import { Timetable } from "@/types";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "@radix-ui/react-icons";

type PopverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TimetableSwitcherProps extends PopverTriggerProps {
  items?: Timetable[] | null;
}

const TimetableSwitcher = ({
  className,
  items = [],
}: TimetableSwitcherProps) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const [open, setOpen] = useState(false);

  const currentTimetable = formattedItems?.find(
    (item) => item.value === params.timetableId
  );

  const onTimetableSelect = (timetable: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${timetable.value}/${pathname.split("/")[2]}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="bg-neutral-950">
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          aria-label="Select a timetable"
          className={cn(
            "w-[200px] justify-between border-neutral-700 hover:bg-neutral-700 hover:text-white",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {currentTimetable?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-neutral-950">
          <CommandList>
            <CommandInput
              placeholder="Search timetable..."
              className="text-white"
            />
            <CommandEmpty>No timetable found</CommandEmpty>

            <CommandGroup heading="Timetables">
              {formattedItems?.map((timetable) => (
                <CommandItem
                  key={timetable.value}
                  onSelect={() => onTimetableSelect(timetable)}
                  className="text-sm hover:bg-neutral-800 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4 mr-2 text-white" />
                  <span className="text-white">{timetable.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-white",
                      currentTimetable?.value === timetable.value
                        ? "oapcity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="bg-neutral-950 cursor-pointer hover:bg-neutral-700"
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <PlusIcon className="mr-2 w-5 h-5 text-white" />
                <span className="text-white">Create timetable</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimetableSwitcher;
