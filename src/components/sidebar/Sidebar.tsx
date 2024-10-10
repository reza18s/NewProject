import React, { useState } from "react";
import { Button } from "../ui/button";
import { categories, categoryTags } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const RealEstateCategory: React.FC = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("SALE");
  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-xl text-blue-600">
        دسته بندی املاک دیبا هوم
      </h1>
      <div className="mb-4 grid grid-cols-3 grid-rows-2 justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={
              selectedCategory === category.value ? "default" : "secondary"
            }
            className="h-10 w-full px-4 py-2 text-sm"
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="mt-6 border-2 px-2">
        <ul className="list-none">
          {categoryTags[selectedCategory!]?.map((item) => (
            <li
              key={item.value}
              className="mb-2 text-right text-lg hover:text-primary"
              onClick={() => {
                route.push(`/?category=${selectedCategory}&tag=${item.value}`);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>منطقه /محل</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>قیمت</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>متراژ</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>نوع سند</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>شرایط معامله</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RealEstateCategory;
