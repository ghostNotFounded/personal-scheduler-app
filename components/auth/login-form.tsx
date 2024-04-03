"use client";

import { LoginSchema } from "@/schemeas";
import { zodResolver } from "@hookform/resolvers/zod";

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

import axios from "axios";

import { BASE_URL } from "@/constants";

import { useRouter } from "next/navigation";

import { createCookie } from "@/lib/cookie";
import { fetchData } from "@/lib/apiHandler";
import { useTimetableStore } from "@/stores/timetable-store";
import { useState } from "react";
import { useEventStore } from "@/stores/events-store";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setTimetablesInStore = useTimetableStore(
    (state) => state.setTimetables
  );

  const setEventsInStore = useEventStore((state) => state.setEvents);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const url = BASE_URL + "/auth/login";
    const password = values.password;
    const email = values.email;

    try {
      setLoading(true);

      const response = await axios.post(url, { email, password });

      if (response?.status === 200) {
        window.localStorage.setItem("token", response?.data?.token);
        await createCookie("Authorized");

        const data = await fetchData("/timetables");

        setTimetablesInStore(data);

        if (data?.length > 0) {
          const id = data[0]._id;

          router.push(`/dashboard/${id}`);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-max mx-auto space-y-5">
      <h3 className="text-5xl font-semibold">
        Welcome back to
        <br /> Plannr
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="f20XXXXXX@pilani.bits-pilani.ac.in"
                      className="bg-purple-500/15 border-purple-500 text-purple-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="********"
                      type="password"
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
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
