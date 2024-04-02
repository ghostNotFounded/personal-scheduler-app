"use client";

import { redirect } from "next/navigation";
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

const NewEventCard = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewEventSchema>>({
    resolver: zodResolver(NewEventSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: undefined,
    },
  });

  const setEventsInStore = useEventStore((state) => state.setEvents);

  const onSubmit = (data: z.infer<typeof NewEventSchema>) => {
    const extension = "/events";

    startTransition(async () => {
      const res = await postData(extension, data);

      setEventsInStore([res]);

      redirect(`/dashboard/${res?._id}`);
    });
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
                          disabled={(date) => date < new Date()}
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
