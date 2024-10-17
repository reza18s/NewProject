import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { DocumentType } from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";

function DocumentTypeFilter({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [documentType, setDocumentType] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Update URL when terms change
  useEffect(() => {
    const selectedTerms = Object.keys(documentType)
      .filter((key) => documentType[key])
      .join("-");

    const params = new URLSearchParams(searchParams);
    if (selectedTerms) {
      params.set("documentType", selectedTerms);
    } else {
      params.delete("documentType");
    }
    router.push(`?${params.toString()}`);
  }, [documentType]);

  // Handle checkbox toggle
  const handleToggle = (itemValue: string) => {
    setDocumentType((prevTerms) => ({
      ...prevTerms,
      [itemValue]: !prevTerms[itemValue],
    }));
  };

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>نوع سند</AccordionTrigger>
      <AccordionContent>
        <div className="mt-6 px-2">
          <ul className="list-none">
            {DocumentType.map((item) => (
              <li
                key={item.value}
                className="mb-2 flex items-center justify-between text-right text-lg hover:text-primary"
                onClick={() => handleToggle(item.value)}
              >
                <label htmlFor={item.name} className="grow cursor-pointer">
                  {item.name}
                </label>
                <Checkbox
                  id={item.name}
                  checked={documentType[item.value] || false}
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

export default DocumentTypeFilter;
