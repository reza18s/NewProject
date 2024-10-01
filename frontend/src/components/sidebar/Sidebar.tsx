import React, { useState } from "react";
import { Button } from "../ui/button";
import { categories, categoryTags } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

const RealEstateCategory: React.FC = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("SALE");
  return (
    <div className="w-full p-4">
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
            className="h-10 w-20 px-4 py-2 text-sm"
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="mt-6">
        <ul className="list-none">
          {categoryTags[selectedCategory!]?.map((item) => (
            <li
              key={item.value}
              className="mb-2 text-right text-lg"
              onClick={() => {
                route.push(`/?category=${selectedCategory}&tag=${item.value}`);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealEstateCategory;
