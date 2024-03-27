"use server";

import { cookies } from "next/headers";

export const createCookie = async (token: string) => {
  cookies().set("auth-token", token, {
    httpOnly: true,
  });
};

export const deleteCookie = async () => {
  cookies().delete("auth-token");
};
