import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password should be at least 6 characters long"),
    confirmPassword: string({
      required_error: "Confirm password is required",
    }).min(6, "Password should be at least 6 characters long"),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email"),

    role: string({
      required_error: "Role is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

// export type CreateUserInput = Omit<
//   TypeOf<typeof createUserSchema>,
//   "body.confirmPassword"
// >;

export type CreateUserInput = TypeOf<typeof createUserSchema>;
