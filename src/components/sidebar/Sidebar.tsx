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
import MeterageFilter from "./MeterageFilter";
import PropertyEvacuationConditionsFilter from "./PropertyEvacuationConditionsFilter";
import MortgagePriceFilter from "./mortgagePriceFilter";
import AmenitiesFilter from "./AmenitiesFilter";
import Image from "next/image";

const RealEstateCategory: React.FC = () => {
  const route = useRouter();
  const store = useModal((state) => state);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [tags, setTags] = useState<{ [key: string]: boolean }>({});
  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value={"1"} className="border-none">
          <AccordionTrigger className="[&>svg]:hidden">
            <h1 className="mb-4 text-center text-2xl text-blue-600">
              دسته بندی املاک دیبا هوم
            </h1>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mb-4 grid grid-cols-3 grid-rows-2 justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  className={`${selectedCategory == category.value ? "bg-primary" : "bg-background text-primary"} h-10 w-full rounded-none border-2 px-4 py-2 text-sm`}
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
            {selectedCategory === "SALE" ? (
              <Accordion type="single" collapsible>
                <Tags
                  id="0"
                  selectedCategory={selectedCategory}
                  tags={tags}
                  setTags={setTags}
                ></Tags>
                <AccordionItem value="1">
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
                <PriceFilter id="2"></PriceFilter>

                <AmenitiesFilter id="3"></AmenitiesFilter>
                <MeterageFilter id="4"></MeterageFilter>
                <TermsFilter id="5"></TermsFilter>
              </Accordion>
            ) : selectedCategory === "MORTGAGE_AND_RENT" ? (
              <Accordion type="single" collapsible>
                <Tags
                  id="0"
                  selectedCategory={selectedCategory}
                  tags={tags}
                  setTags={setTags}
                ></Tags>
                <AccordionItem value="1">
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
                <MortgagePriceFilter id="2"></MortgagePriceFilter>
                <MeterageFilter id="3"></MeterageFilter>
                <AmenitiesFilter id="4"></AmenitiesFilter>
                <PropertyEvacuationConditionsFilter id="5" />
              </Accordion>
            ) : (
              ""
            )}
            <div className="my-2 h-[4px] border-2 border-gray-400"></div>
            <h2 className="border-2 pr-2 text-lg font-semibold">
              تبلیغات هوشمند
            </h2>
            <div className="my-2 h-[4px] border-2 border-gray-400"></div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">درباره ما</h3>
              <h3 className="text-sm font-medium">ارتباط باما</h3>
              <h3 className="text-sm font-medium">نصب اپلکیشن</h3>
            </div>
            <div className="my-2 h-[4px] border-2 border-gray-400"></div>
            <div>
              <h2 className="text-center text-xl font-semibold text-primary">
                مشاورین و املاک برتر
              </h2>
              <div className="flex h-14 justify-between font-semibold text-primary">
                <h3>املاک دایان (100 اگاهی)</h3>
                <Image
                  src={"/image/1.jpeg"}
                  width={50}
                  height={20}
                  alt="avatar"
                ></Image>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RealEstateCategory;
