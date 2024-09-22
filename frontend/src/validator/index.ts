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
export const CategorySchema = z.enum([
  "SALE", // فروش,
  "MORTGAGE_AND_RENT", // رهن و اجاره
  "LONG_TERM_RENT", // اجاره بلند مدت
  "NEED_TO_BUY", // نیاز به خرید
  "PARTNERSHIP", // مشارکت
  "PRE_SALE", // پیش فروش
]);
export const CategoryTagSchema = z.enum([
  "RESIDENTIAL_APARTMENT", // آپارتمان مسکونی
  "VILLA", // خانه و ویلا
  "LAND", // زمین و کلنگی
  "OFFICE", // دفاتر اداری
  "SHOP", // مغازه و تجاری
  "BUILDING_COMPLEX", // مستغلات یکجا
  "WAREHOUSE_FACTORY", // کارخانه و انبار
  "MINE", // انواع معدن
  "GOVERNMENT_CENTER", // مراکز دولتی
  "FARM_GREEN_SPACE", // کشاورزی و فضای سبز
  "EDUCATION_RECREATION", // مراکز آموزشی،تفریحی
  "MEDICAL_CENTER", // مراکز بهداشتی و درمانی
  "SHOP_AND_BOOTH", // مغازه و غرفه
  "APARTMENT_AND_SUITE", // آپارتمان و سویت
  "BEACH_VILLA", // ویلا ساحلی
  "FOREST_MOUNTAIN_VILLA", // ویلا جنگلی-کوهستانی
  "SWISS_COTTAGE", // کلبه سوئیسی
  "TOURISM", // بومگردی
  "LUXURY_ACCOMMODATION", // اقامتگاه لاکچری
  "EVENT_HALL", // تالار و سالن مراسم
  "OFFICE_APARTMENT", // آپارتمان اداری
  "SHOP_AND_COMMERCIAL", // مغازه و تجاری
  "GOVERNMENT_PROJECT", // پروژه های دولتی
  "MASKAN_MEHR_PROJECT", // پروژه های مسکن مهر
  "RESIDENTIAL_CONSTRUCTION", // مشارکت در ساخت (مسکونی)
  "COMMERCIAL_CONSTRUCTION", // مشارکت در ساخت (اداری و تجاری)
  "VILLA_CITY_CONSTRUCTION", // مشارکت در ساخت (ویلا سازی و شهرک سازی)
  "CONTRACT_MANAGEMENT", // مدیریت پیمان و مشاوره
  "LARGE_GOVERNMENT_PROJECT", // پروژه های بزرگ دولتی
  "LAND_AND_OLD_PROPERTY", // زمین و کلنگی
]);
export const createProfileObject = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  phone: z.string(),
  realState: z.string(),
  price: z.number(),
  constructionDate: z.date(),
  category: z.string(),
  tag: z.string(),
  province: z.string(),
  city: z.string(),
  amenities: z.array(z.string()),
  rules: z.array(z.string()),
});
export const updateProfileObject = createProfileObject.extend({
  id: z.string(),
});
