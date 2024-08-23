"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import DatePicker from "react-multi-date-picker";
import TextList from "./TextList";
import { Profile } from "@prisma/client";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  phone: z.string(),
  price: z.number(),
  realState: z.string(),
  constructionDate: z.date(),
  province: z.string(),
  city: z.string(),
  category: z.string(),
  rules: z.array(z.string()),
  amenities: z.array(z.string()),
});

export const AddProfilePage = ({ data }: { data?: Profile }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      location: data?.location || "",
      phone: data?.phone || "",
      price: data?.price || 0,
      realState: data?.realState || "",
      constructionDate: new Date(data?.constructionDate) || new Date(),
      province: data?.province || "",
      city: data?.city || "",
      category: data?.category || "",
      rules: data?.rules || [],
      amenities: data?.amenities || [],
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ ...values, id: data.id }),
        headers: { "Content-Type": "application/json" },
      });
      const newData = await res.json();
      if (newData.error) {
        toast.error(newData.error);
      } else {
        toast.success(newData.message);
        router.refresh();
      }
    } else {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        router.refresh();
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان آگهی</FormLabel>
              <FormControl>
                <Input placeholder="عنوان آگهی" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Input placeholder="توضیحات" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="realState"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Input placeholder="توضیحات" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>آدرس</FormLabel>
              <FormControl>
                <Input placeholder="آدرس" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تماس</FormLabel>
              <FormControl>
                <Input placeholder="شماره تماس" type="phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت(تومان)</FormLabel>
              <FormControl>
                <Input
                  placeholder="قیمت(تومان)"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>استان</FormLabel>
              <FormControl>
                <Input placeholder="استان" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شهر</FormLabel>
              <FormControl>
                <Input placeholder="شهر" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دسته بندی</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="villa" id="villa" />
                    <Label htmlFor="villa">ویلا</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apartment" id="apartment" />
                    <Label htmlFor="apartment">آپارتمان</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="store" id="store" />
                    <Label htmlFor="store">مغازه</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="office" id="office" />
                    <Label htmlFor="office">دفتر</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>امکانات و قابلیت ها</FormLabel>
              <FormControl>
                <TextList
                  data={field.value}
                  setData={field.onChange}
                ></TextList>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem>
              <FormLabel>امکانات و قابلیت ها</FormLabel>
              <FormControl>
                <TextList
                  data={field.value}
                  setData={field.onChange}
                ></TextList>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="constructionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شهر</FormLabel>
              <FormControl>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={field.value}
                  onChange={(e) => {
                    // @ts-ignore
                    field.onChange(new Date(e));
                  }}
                  calendarPosition="bottom-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
