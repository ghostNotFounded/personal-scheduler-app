"use client";

import { NewTimetableSchema } from "@/schemeas";
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
import { redirect } from "next/navigation";
import { useTimetableStore } from "@/stores/timetable-store";

const NewTimetableCard = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewTimetableSchema>>({
    resolver: zodResolver(NewTimetableSchema),
    defaultValues: {
      name: "",
    },
  });

  const setTimetablesInStore = useTimetableStore(
    (state) => state.setTimetables
  );

  const onSubmit = (data: z.infer<typeof NewTimetableSchema>) => {
    const extension = "/timetables";

    startTransition(async () => {
      const res = await postData(extension, data);

      setTimetablesInStore(res);

      redirect(`/dashboard/${res?._id}`);
    });
  };

  return (
    <div className="flex flex-col w-max mx-auto space-y-5">
      <h3 className="text-5xl font-semibold">Make a timetable</h3>

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
                      placeholder="Timetable #1"
                      className="bg-purple-500/15 border-purple-500 text-purple-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-500/15 text-purple-500 hover:border border-purple-500 hover:bg-purple-500/30 hover:text-purple-300"
            disabled={isPending}
          >
            Create timetable
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewTimetableCard;
