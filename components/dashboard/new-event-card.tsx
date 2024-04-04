"use client";

import { useEventStore } from "@/stores/events-store";
import { NewEventSchema } from "@/schemeas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";

import * as z from "zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { postData } from "@/lib/apiHandler";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { TimePicker } from "../ui/date-time-picker/time-picker";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NewEventCard = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewEventSchema>>({
    resolver: zodResolver(NewEventSchema),
    defaultValues: {
      name: "",
      eventDate: undefined,
      startTime: "",
      endTime: "",
    },
  });

  const { timetableId } = useParams();
  const router = useRouter();

  const events = useEventStore((state) => state.events);

  const onSubmit = (data: z.infer<typeof NewEventSchema>) => {
    const extension = `/timetables/${timetableId}/events`;

    const padWithZero = (num: number): string => {
      return num < 10 ? "0" + num : num.toString();
    };

    const constructTime = (date: Date, time: String) => {
      return `${date.getFullYear()}-${padWithZero(
        date.getMonth() + 1
      )}-${padWithZero(date.getDate())}T${padWithZero(
        parseInt(time.split(":")[0])
      )}:${padWithZero(parseInt(time.split(":")[1]))}:00Z`;
    };

    const startDate = new Date(data.eventDate);
    const finalStartDate = constructTime(startDate, data.startTime);

    const endDate = new Date(data.eventDate);
    const finalEndDate = constructTime(endDate, data.endTime);

    const existingEvents = events.map((event) => {
      // Split the date string by '-'
      const startDateParts = event.startDate.split("-");
      const endDateParts = event.endDate.split("-");

      // Extract day, month, and year from the split parts
      const startDay = parseInt(startDateParts[0]);
      const startMonth = parseInt(startDateParts[1]) - 1; // Month is zero-based index
      const startYear = parseInt(startDateParts[2]);

      const endDay = parseInt(endDateParts[0]);
      const endMonth = parseInt(endDateParts[1]) - 1; // Month is zero-based index
      const endYear = parseInt(endDateParts[2]);

      // Extract start and end time components
      const [startHour, startMinute] = event.startTime.split(":");
      const [endHour, endMinute] = event.endTime.split(":");

      // Create date objects using the correct order of day, month, and year
      const startDateTime = new Date(
        startYear,
        startMonth,
        startDay,
        parseInt(startHour),
        parseInt(startMinute),
        0
      );
      const endDateTime = new Date(
        endYear,
        endMonth,
        endDay,
        parseInt(endHour),
        parseInt(endMinute),
        0
      );

      return { start: startDateTime, end: endDateTime };
    });

    const isClashing = existingEvents.some((event) => {
      const startDate = new Date(finalStartDate);
      const endDate = new Date(finalEndDate);

      startDate.setHours(startDate.getHours() - 5);
      startDate.setMinutes(startDate.getMinutes() - 30);

      endDate.setHours(endDate.getHours() - 5);
      endDate.setMinutes(endDate.getMinutes() - 30);

      const eventStart = event.start;
      const eventEnd = event.end;

      return (
        (startDate >= eventStart && startDate < eventEnd) || // Case 1: new event starts between existing event start and end
        (endDate > eventStart && endDate <= eventEnd) || // Case 2: new event ends between existing event start and end
        (startDate <= eventStart && endDate >= eventEnd) || // Case 3: new event fully contains existing event
        (startDate >= eventStart && endDate <= eventEnd) // Case 4: new event is fully contained by existing event
      );
    });

    console.log(isClashing);

    if (isClashing) {
      toast.error("You already have another event");
      return;
    }

    if (finalEndDate >= finalStartDate) {
      startTransition(async () => {
        const body = {
          startTime: finalStartDate,
          endTime: finalEndDate,
          name: data.name,
        };

        await postData(extension, body);

        toast.success("Event successfully created");

        router.push(`/dashboard/${timetableId}`);
      });
    } else {
      toast.error("Event cannot end before starting");
    }
  };

  return (
    <div className="flex flex-col w-max mx-auto space-y-5">
      <h3 className="text-5xl font-semibold">Create a new event</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={15}
                      disabled={isPending}
                      {...field}
                      placeholder="Event #1"
                      className="bg-purple-500/15 border-purple-500 text-purple-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of event</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isPending}
                          variant={"outline"}
                          className="w-full pl-3 text-left font-normal bg-purple-500/15 hover:bg-purple-500/20 border-purple-500 text-purple-200 hover:text-purple-200"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start time</FormLabel>
                    <FormControl>
                      <TimePicker
                        hourCycle={24}
                        onChange={(selectedTime) => {
                          if (selectedTime) {
                            const formattedTime = `${selectedTime.hour}:${selectedTime.minute}`;
                            field.onChange(formattedTime);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End time</FormLabel>
                    <FormControl>
                      <TimePicker
                        hourCycle={24}
                        onChange={(selectedTime) => {
                          if (selectedTime) {
                            const formattedTime = `${selectedTime.hour}:${selectedTime.minute}`;
                            field.onChange(formattedTime);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-500/15 text-purple-500 hover:border border-purple-500 hover:bg-purple-500/30 hover:text-purple-300"
            disabled={isPending}
          >
            Create event
          </Button>
        </form>
      </Form>

      <p
        onClick={() => router.back()}
        className="group cursor-pointer min-h-full"
      >
        &lt;- <span className="group-hover:underline">Go back</span>
      </p>
    </div>
  );
};

export default NewEventCard;
