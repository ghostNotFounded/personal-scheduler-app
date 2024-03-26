import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(1, { message: "Where email?" }),
  password: z.string().min(1, { message: "Password is required" }),
});
