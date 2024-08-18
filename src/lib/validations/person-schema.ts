import { z } from "zod";
import { Roles, Status, Teams } from "../constants/user";

export const personInfoSchema = z.object({
  dob: z.any(),
  email: z.string().email(),
  gender: z.string(),
  nationality: z.string(),
  phone: z
    .any()
    .refine((val) => typeof val === "string" || typeof val === "number"),
  work_email: z.string().email(),
  job: z.object({
    title: z.string(),
    desc: z.string(),
  }),
});

export const personSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "name too short"),
  email: z.string().email(),
  role: z.string().refine((val) => Object.keys(Roles).includes(val)),
  teams: z
    .array(z.string().refine((val) => Object.keys(Teams).includes(val)))
    .min(1, "Please select as least one team"),
  image: z.string().optional(),
  status: z.string().refine((val) => Object.keys(Status).includes(val)),
});
