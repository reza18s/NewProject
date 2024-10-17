import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { categoryTags } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

function Tags({
  selectedCategory,
  tags,
  setTags,
  id,
}: {
  id: string;
  selectedCategory: string;
  tags: { [key: string]: boolean };
  setTags: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagToggle = (tag: string) => {
    setTags((prevTags) => {
      const updatedTags = { ...prevTags, [tag]: !prevTags[tag] };
      const activeTags = Object.keys(updatedTags).filter(
        (key) => updatedTags[key],
      );

      // Use URLSearchParams to maintain existing query parameters
      const params = new URLSearchParams(searchParams);
      params.set("category", selectedCategory);

      if (activeTags.length > 0) {
        params.set("tag", activeTags.join("-"));
      } else {
        params.delete("tag");
      }

      router.push(`/?${params.toString()}`);

      return updatedTags;
    });
  };

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>دسته ها</AccordionTrigger>
      <AccordionContent>
        <div className="mt-6 px-2">
          <ul className="list-none">
            {categoryTags[selectedCategory]?.map((item) => (
              <li
                key={item.value}
                className="mb-2 flex items-center justify-between text-right text-lg hover:text-primary"
                onClick={() => handleTagToggle(item.value)}
              >
                <label htmlFor={item.name}>{item.name}</label>
                <Checkbox id={item.name} checked={tags[item.value] || false} />
              </li>
            ))}
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default Tags;
