import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { PropertyEvacuationConditions } from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";

function PropertyEvacuationConditionsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConditions, setSelectedConditions] = useState<{
    [key: string]: boolean;
  }>({});

  // Update URL when conditions change
  useEffect(() => {
    const activeConditions = Object.keys(selectedConditions)
      .filter((key) => selectedConditions[key])
      .join("-");

    const params = new URLSearchParams(searchParams);
    if (activeConditions) {
      params.set("evacuationConditions", activeConditions);
    } else {
      params.delete("evacuationConditions");
    }
    router.push(`?${params.toString()}`);
  }, [selectedConditions, router, searchParams]);

  // Handle checkbox toggle
  const handleToggle = (conditionValue: string) => {
    setSelectedConditions((prevConditions) => ({
      ...prevConditions,
      [conditionValue]: !prevConditions[conditionValue],
    }));
  };

  return (
    <AccordionItem value="item-4">
      <AccordionTrigger>شرایط تخلیه ملک</AccordionTrigger>
      <AccordionContent>
        <div className="mt-6 px-2">
          <ul className="list-none">
            {PropertyEvacuationConditions.map((item) => (
              <li
                key={item.value}
                className="mb-2 flex items-center justify-between text-right text-lg hover:text-primary"
              >
                <label
                  htmlFor={item.name}
                  className="grow cursor-pointer"
                  onClick={() => handleToggle(item.value)}
                >
                  {item.name}
                </label>
                <Checkbox
                  id={item.name}
                  checked={selectedConditions[item.value] || false}
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

export default PropertyEvacuationConditionsFilter;
