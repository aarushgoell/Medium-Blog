import { z } from "zod";

export const signUpCheck = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});
export const signInCheck = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const blogInputCheck = z.object({
  title: z.string().min(1),
  content: z.string().min(10),
});
export const blogUpdateCheck = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string(),
  published: z.boolean().optional(),
});

export type signUpParam = z.infer<typeof signUpCheck>;
export type signInParam = z.infer<typeof signInCheck>;
export type blogInputParam = z.infer<typeof blogInputCheck>;
export type blogUpdateParam = z.infer<typeof blogUpdateCheck>;
