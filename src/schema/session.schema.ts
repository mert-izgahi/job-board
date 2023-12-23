import { TypeOf, object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),

    password: string({
      required_error: "Password is required",
    }).min(6, "Password should be at least 6 characters long"),
  }),
});


export type CreateSessionInput = Omit<TypeOf<typeof createSessionSchema>, "body.password">;
