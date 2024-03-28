"use client";

import { LoginSchema } from "@/schemeas";
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

import axios from "axios";

import { BASE_URL } from "@/constants";

import { redirect, useRouter } from "next/navigation";
import { createCookie } from "@/lib/cookie";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    const url = BASE_URL + "/auth/login";

    const password = values.password;
    const email = values.email;

    startTransition(async () => {
      try {
        const response = await axios.post(url, { email, password });

        if (response?.status === 200) {
          window.localStorage.setItem("token", response?.data?.token);
          await createCookie("Authorized");

          router.push("/app");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    });
  };

  return (
    <div className="flex flex-col w-max mx-auto space-y-5 text-forestLight">
      <h3 className="text-5xl font-semibold">
        Welcome back to
        <br /> Task<span className="text-purple-400">Tide</span>
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
                      disabled={isPending}
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
                      disabled={isPending}
                      {...field}
                      placeholder="******"
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
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
