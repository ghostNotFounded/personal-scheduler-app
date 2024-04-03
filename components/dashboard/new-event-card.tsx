"use client";

import { useEventStore } from "@/stores/events-store";
import { NewEventSchema } from "@/schemeas";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";

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

const NewEventCard = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewEventSchema>>({
    resolver: zodResolver(NewEventSchema),
    defaultValues: {
      name: "",
      startDate: undefined,
      endDate: undefined,
      startTime: "",
      endTime: "",
    },
  });

  const { timetableId, eventId } = useParams();
  const router = useRouter();

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

    const startDate = new Date(data.startDate);
    const finalStartDate = constructTime(startDate, data.startTime);

    const endDate = new Date(data.endDate);
    const finalEndDate = constructTime(endDate, data.endTime);

    if (finalEndDate >= finalStartDate) {
      startTransition(async () => {
        const body = {
          startTime: finalStartDate,
          endTime: finalEndDate,
          name: data.name,
        };

        await postData(extension, body);

        router.push(`/dashboard/${timetableId}`);
      });
    } else {
      console.log("Your event can't end before it starts");
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

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
                            variant={"outline"}
                            className="w-[240px] pl-3 text-left font-normal bg-purple-500/15 hover:bg-purple-500/20 border-purple-500 text-purple-200 hover:text-purple-200"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a start date</span>
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
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isPending}
                            variant={"outline"}
                            className="w-[240px] pl-3 text-left font-normal bg-purple-500/15 hover:bg-purple-500/20 border-purple-500 text-purple-200 hover:text-purple-200"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an end date</span>
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
                            date < form.getValues("startDate")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
    </div>
  );
};

export default NewEventCard;
