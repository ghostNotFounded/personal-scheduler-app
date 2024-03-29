import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(1, { message: "Where email :0" }),
  password: z.string().min(1, { message: "Password is required :)" }),
});

export const NewTimetableSchema = z.object({
  name: z.string().min(1, { message: "Your timetable must have a name :/" }),
});
