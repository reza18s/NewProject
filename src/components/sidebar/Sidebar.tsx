import React, { useState } from "react";
import { Button } from "../ui/button";
import { categories, subcategories } from "@/constants";

const RealEstateCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("فروش");

  return (
    <div className="w-full p-4">
      <h1 className="mb-4 text-center text-xl text-blue-600">
        دسته بندی املاک دیا هوم
      </h1>
      <div className="mb-4 grid grid-cols-3 grid-rows-2 justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className="h-10 w-20 px-4 py-2 text-sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="mt-6">
        <ul className="list-none">
          {subcategories[selectedCategory]?.map(
            (item: string, index: string) => (
              <li key={index} className="mb-2 text-right text-lg">
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default RealEstateCategory;
