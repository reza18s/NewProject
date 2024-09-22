export const categories = [
  {
    name: "فروش",
    value: "SALE",
  },
  {
    name: "رهن و اجاره",
    value: "MORTGAGE_AND_RENT",
  },
  {
    name: "اجاره بلند مدت",
    value: "LONG_TERM_RENT",
  },
  {
    name: "نیاز به خرید",
    value: "NEED_TO_BUY",
  },
  {
    name: "مشارکت",
    value: "PARTNERSHIP",
  },
  {
    name: "پیش فروش",
    value: "PRE_SALE",
  },
];
export const categoryTags: {
  [key: string]: { name: string; value: string }[];
} = {
  SALE: [
    { name: "آپارتمان مسکونی", value: "RESIDENTIAL_APARTMENT" }, // آپارتمان مسکونی
    { name: "خانه و ویلا", value: "VILLA" }, // خانه و ویلا
    { name: "زمین و کلنگی", value: "LAND_AND_OLD_PROPERTY" }, // زمین و کلنگی
    { name: "دفاتر اداری", value: "OFFICE" }, // دفاتر اداری
    { name: "مغازه و تجاری", value: "SHOP_AND_COMMERCIAL" }, // مغازه و تجاری
    { name: "مستغلات یکجا", value: "BUILDING_COMPLEX" }, // مستغلات یکجا
    { name: "کارخانه و انبار", value: "WAREHOUSE_FACTORY" }, // کارخانه و انبار
    { name: "انواع معدن", value: "MINE" }, // انواع معدن
  ],
  MORTGAGE_AND_RENT: [
    { name: "آپارتمان مسکونی", value: "RESIDENTIAL_APARTMENT" }, // آپارتمان مسکونی
    { name: "خانه و ویلا", value: "VILLA" }, // خانه و ویلا
    { name: "زمین", value: "LAND" }, // زمین
    { name: "دفاتر اداری", value: "OFFICE" }, // دفاتر اداری
    { name: "مغازه و غرفه", value: "SHOP_AND_BOOTH" }, // مغازه و غرفه
    { name: "مستغلات یکجا", value: "BUILDING_COMPLEX" }, // مستغلات یکجا
    { name: "کارخانه و انبار", value: "WAREHOUSE_FACTORY" }, // کارخانه و انبار
    { name: "انواع معدن", value: "MINE" }, // انواع معدن
  ],
  LONG_TERM_RENT: [
    { name: "آپارتمان و سوئیت", value: "APARTMENT_AND_SUITE" }, // آپارتمان و سوئیت
    { name: "ویلا ساحلی", value: "BEACH_VILLA" }, // ویلا ساحلی
    { name: "ویلا جنگلی-کوهستانی", value: "FOREST_MOUNTAIN_VILLA" }, // ویلا جنگلی-کوهستانی
    { name: "کلبه سوئیسی", value: "SWISS_COTTAGE" }, // کلبه سوئیسی
    { name: "بومگردی", value: "TOURISM" }, // بومگردی
    { name: "اقامتگاه لاکچری", value: "LUXURY_ACCOMMODATION" }, // اقامتگاه لاکچری
    { name: "تالار و سالن مراسم", value: "EVENT_HALL" }, // تالار و سالن مراسم
    { name: "آپارتمان مسکونی", value: "RESIDENTIAL_APARTMENT" }, // آپارتمان مسکونی
    { name: "خانه و ویلا", value: "VILLA" }, // خانه و ویلا
  ],
  PRE_SALE: [
    { name: "آپارتمان مسکونی", value: "RESIDENTIAL_APARTMENT" }, // آپارتمان مسکونی
    { name: "آپارتمان اداری", value: "OFFICE_APARTMENT" }, // آپارتمان اداری
    { name: "مغازه و تجاری", value: "SHOP_AND_COMMERCIAL" }, // مغازه و تجاری
    { name: "پروژه‌های دولتی", value: "GOVERNMENT_PROJECT" }, // پروژه‌های دولتی
    { name: "پروژه‌های مسکن مهر", value: "MASKAN_MEHR_PROJECT" }, // پروژه‌های مسکن مهر
  ],
  PARTNERSHIP: [
    { name: "مشارکت در ساخت (مسکونی)", value: "RESIDENTIAL_CONSTRUCTION" }, // مشارکت در ساخت (مسکونی)
    {
      name: "مشارکت در ساخت (اداری و تجاری)",
      value: "COMMERCIAL_CONSTRUCTION",
    }, // مشارکت در ساخت (اداری و تجاری)
    {
      name: "مشارکت در ساخت (ویلاسازی و شهرک سازی)",
      value: "VILLA_CITY_CONSTRUCTION",
    }, // مشارکت در ساخت (ویلاسازی و شهرک سازی)
    { name: "مدیریت پیمان و مشاوره", value: "CONTRACT_MANAGEMENT" }, // مدیریت پیمان و مشاوره
    { name: "پروژه‌های بزرگ دولتی", value: "LARGE_GOVERNMENT_PROJECT" }, // پروژه‌های بزرگ دولتی
  ],
  NEED_TO_BUY: [
    { name: "آپارتمان مسکونی", value: "RESIDENTIAL_APARTMENT" }, // آپارتمان مسکونی
    { name: "خانه و ویلا", value: "VILLA" }, // خانه و ویلا
    { name: "زمین و کلنگی", value: "LAND_AND_OLD_PROPERTY" }, // زمین و کلنگی
    { name: "دفاتر اداری", value: "OFFICE" }, // دفاتر اداری
    { name: "مغازه و تجاری", value: "SHOP_AND_COMMERCIAL" }, // مغازه و تجاری
    { name: "مستغلات یکجا", value: "BUILDING_COMPLEX" }, // مستغلات یکجا
    { name: "کارخانه و انبار", value: "WAREHOUSE_FACTORY" }, // کارخانه و انبار
    { name: "انواع معدن", value: "MINE" }, // انواع معدن
  ],
};
