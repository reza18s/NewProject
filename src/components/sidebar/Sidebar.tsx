import React, { useState } from "react";
import { Button } from "../ui/button";
import { categories } from "@/constants";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CustomModal from "../modals/CustomModal";
import Filter from "../modals/Filter";
import { useModal } from "@/stores/useModal";
import Tags from "./tags";
import PriceFilter from "./priceFilter";
import TermsFilter from "./termsFilter";
import DocumentTypeFilter from "./DocumentTypeFilter";
import MeterageFilter from "./MeterageFilter";

const RealEstateCategory: React.FC = () => {
  const route = useRouter();
  const store = useModal((state) => state);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [tags, setTags] = useState<{ [key: string]: boolean }>({});
  return (
    <div className="w-full">
      <h1 className="mb-4 text-center text-2xl text-blue-600">
        دسته بندی املاک دیبا هوم
      </h1>
      <div className="mb-4 grid grid-cols-3 grid-rows-2 justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            className="h-10 w-full rounded-none border-2 bg-background px-4 py-2 text-sm text-primary"
            onClick={() => {
              route.push(`/?category=${category.value}`);
              setTags({});
              setSelectedCategory(category.value);
            }}
          >
            {category.name}
          </Button>
        ))}
      </div>
      {selectedCategory === "SALE" && (
        <Accordion type="single" collapsible>
          <Tags
            selectedCategory={selectedCategory}
            tags={tags}
            setTags={setTags}
          ></Tags>
          <AccordionItem value="item-1">
            <AccordionTrigger
              onClick={() => {
                store.setOpen(
                  <CustomModal>
                    <Filter />
                  </CustomModal>,
                );
              }}
            >
              منطقه /محل
            </AccordionTrigger>
          </AccordionItem>
          <PriceFilter></PriceFilter>

          <MeterageFilter></MeterageFilter>
          <TermsFilter></TermsFilter>
        </Accordion>
      )}
      <div className="my-2 h-[4px] border-2 border-gray-400"></div>
      <h2 className="border-2 pr-2 text-lg font-semibold">تبلیغات هوشمند</h2>
      <div className="my-2 h-[4px] border-2 border-gray-400"></div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">درباره ما</h3>
        <h3 className="text-sm font-medium">ارتباط باما</h3>
        <h3 className="text-sm font-medium">نصب اپلکیشن</h3>
      </div>
      <div className="my-2 h-[4px] border-2 border-gray-400"></div>
      <h2 className="text-center text-xl font-semibold text-primary">
        مشاورین و املاک برتر
      </h2>
    </div>
  );
};

export default RealEstateCategory;
