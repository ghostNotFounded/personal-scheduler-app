import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(1, { message: "Where email :0" }),
  password: z.string().min(1, { message: "Password is required :)" }),
});

export const NewTimetableSchema = z.object({
  name: z.string().min(1, { message: "Your timetable must have a name :/" }),
});

export const NewEventSchema = z.object({
  name: z.string().min(1, { message: "Your event must have a name :/" }),
  eventDate: z.date({ required_error: "Start time is required." }),
  startTime: z.string(),
  endTime: z.string(),
});
