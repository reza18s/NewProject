import { z } from "zod";

export const signupObject = z
  .object({
    phoneNumber: z.string().regex(/^(?:0?|0980)?(9\d{9})$/),
  })
  .strict();
export const signinObject = z
  .object({
    phoneNumber: z.string().regex(/^(?:0?|0980)?(9\d{9})$/),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/),
  })
  .strict();
export const forgotPasswordObject = z
  .object({
    email: z.string().email(),
  })
  .strict();
export const updatePasswordObject = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/),
    newPassword: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/),
    newPasswordConfirm: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/),
  })
  .strict();
export const resetPasswordObject = z
  .object({
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/),
    passwordConfirm: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/),
  })
  .strict();
export const updateMyUserObject = z
  .object({
    name: z.string().min(4, "Please enter a valid value").optional(),
    avatar: z.string().url("please enter a url").optional(),
  })
  .strict();
export const updateUserObject = z
  .object({
    name: z.string().min(4, "Please enter a valid value").optional(),
    role: z.enum(["user", "admin"]).optional(),
    avatar: z.string().url("please enter a url").optional(),
  })
  .strict();
export const RealEstateCategorySchema = z.enum([
  "فروش",
  "رهن و اجاره",
  "اجاره بلند مدت",
  "اجاره کوتاه مدت",
  "نیاز به خرید",
  "مشارکت",
  "پیش فروش",
]);
export const createProfileObject = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  phone: z.string(),
  realState: z.string(),
  price: z.number(),
  constructionDate: z.date(),
  category: RealEstateCategorySchema,
  tag: z.string(),
  province: z.string(),
  city: z.string(),
  amenities: z.array(z.string()),
  rules: z.array(z.string()),
});
export const updateProfileObject = createProfileObject.extend({
  id: z.string(),
});
