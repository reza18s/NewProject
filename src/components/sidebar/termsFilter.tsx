import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { TransactionTerms } from "@/constants";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";

function TermsFilter({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [terms, setTerms] = useState<{ [key: string]: boolean }>({});

  // Update URL when terms change
  useEffect(() => {
    const selectedTerms = Object.keys(terms)
      .filter((key) => terms[key])
      .join("-");

    const params = new URLSearchParams(searchParams);
    if (selectedTerms) {
      params.set("transactionTerms", selectedTerms);
    } else {
      params.delete("transactionTerms");
    }
    router.push(`?${params.toString()}`);
  }, [terms]);

  // Handle checkbox toggle
  const handleToggle = (itemValue: string) => {
    setTerms((prevTerms) => ({
      ...prevTerms,
      [itemValue]: !prevTerms[itemValue],
    }));
  };

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>شرایط معامله</AccordionTrigger>
      <AccordionContent>
        <div className="mt-6 px-2">
          <ul className="list-none">
            {TransactionTerms.map((item) => (
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
                  checked={terms[item.value] || false}
                ></Checkbox>
              </li>
            ))}
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default TermsFilter;
