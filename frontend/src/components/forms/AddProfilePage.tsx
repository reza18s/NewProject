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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import DatePicker from "react-multi-date-picker";
import TextList from "./TextList";
import { createProfileObject } from "@/validator";
import { useState } from "react";
import { categories, categoryTags } from "@/constants";
import toast from "react-hot-toast";
import { IProfiles } from "@/types";
export const AddProfilePage = ({ data }: { data?: IProfiles }) => {
  const form = useForm<z.infer<typeof createProfileObject>>({
    resolver: zodResolver(createProfileObject),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      location: data?.location || "",
      phone: data?.phone || "",
      price: data?.price || 0,
      realState: data?.realState || "",
      constructionDate: data?.constructionDate || new Date(),
      province: data?.province || "",
      tag: data?.tag || "",
      city: data?.city || "",
      category: data?.category || "",
      rules: data?.rules.split("-") || [""],
      amenities: data?.amenities.split("-") || [""],
    },
  });
  const router = useRouter();
  const [category, setCategory] = useState<string>("SALE");

  async function onSubmit(values: z.infer<typeof createProfileObject>) {
    if (data) {
      const res = await fetch("https://bakend.koderamir.ir/api/v1/profiles", {
        method: "PATCH",
        body: JSON.stringify({ ...values, id: data.id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const newData = await res.json();
      if (newData.error) {
        console.log(newData);
        toast.error(newData.error.message);
      } else {
        toast.success(newData.message);
        router.refresh();
      }
    } else {
      const res = await fetch("https://bakend.koderamir.ir/api/v1/profiles", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          rules: values.rules.join("-"),
          amenities: values.amenities.join("-"),
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error.message);
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
                  onValueChange={(e) => {
                    setCategory(e);
                    field.onChange(e);
                  }}
                  defaultValue={field.value}
                  className="flex"
                >
                  {categories.map((value) => (
                    <div
                      className="flex items-center space-x-2"
                      key={value.value}
                    >
                      <RadioGroupItem value={value.value} id={value.value} />
                      <Label htmlFor={value.value}>{value.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دسته </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  {categoryTags[category]?.map((item) => (
                    <div
                      className="flex items-center space-x-2"
                      key={item.value}
                    >
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label htmlFor={item.value}>{item.name}</Label>
                    </div>
                  ))}
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
                    // @ts-expect-error dec
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
