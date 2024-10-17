import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Amenities } from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";

function AmenitiesFilter({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAmenities, setSelectedAmenities] = useState<{
    [key: string]: boolean;
  }>({});

  // Update URL when amenities selection changes
  useEffect(() => {
    const selectedItems = Object.keys(selectedAmenities)
      .filter((key) => selectedAmenities[key])
      .join("-");

    const params = new URLSearchParams(searchParams.toString());
    if (selectedItems) {
      params.set("amenities", selectedItems);
    } else {
      params.delete("amenities");
    }
    router.push(`?${params.toString()}`);
  }, [selectedAmenities, searchParams, router]);

  // Handle checkbox toggle
  const handleToggle = (amenityValue: string) => {
    setSelectedAmenities((prevAmenities) => ({
      ...prevAmenities,
      [amenityValue]: !prevAmenities[amenityValue],
    }));
  };

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>امکانات</AccordionTrigger>
      <AccordionContent>
        <div className="mt-6 px-2">
          <ul className="list-none">
            {Amenities.map((item) => (
              <li
                key={item.value}
                className="mb-2 flex cursor-pointer items-center justify-between text-right text-lg hover:text-primary"
                onClick={() => handleToggle(item.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleToggle(item.value)
                }
                tabIndex={0}
                role="button"
                aria-pressed={selectedAmenities[item.value] || false}
              >
                <label htmlFor={item.name} className="grow cursor-pointer">
                  {item.name}
                </label>
                <Checkbox
                  id={item.name}
                  checked={selectedAmenities[item.value] || false}
                  onChange={() => handleToggle(item.value)}
                />
              </li>
            ))}
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default AmenitiesFilter;
