import { TypeOf, number, object, string } from "zod";

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

export const updateUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    availability: string(),
    hourlyRate: number().min(0, "Hourly rate cannot be negative"),
    photo: string(),
    bio: string().max(512, "Bio should be less than 512 characters"),
  }).refine(
    (data) => {
      if (
        ["full-time", "part-time", "remote", "internship"].includes(
          data.availability
        )
      ) {
        return true;
      }
      return false;
    },
    {
      message: "Invalid availability",
      path: ["availability"],
    }
  ),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;