"use client";
import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";

function MortgagePriceFilter({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filter values
  const [mortgage, setMortgage] = useState<string>("");
  const [rent, setRent] = useState<string>("");
  const [conversionCapability, setConversionCapability] =
    useState<boolean>(false);
  const [fullMortgage, setFullMortgage] = useState<boolean>(false);

  // Update URL when filter values change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (mortgage) {
      params.set("mortgage", mortgage);
    } else {
      params.delete("mortgage");
    }

    if (rent) {
      params.set("rent", rent);
    } else {
      params.delete("rent");
    }

    if (conversionCapability) {
      params.set("conversionCapability", "true");
    } else {
      params.delete("conversionCapability");
    }

    if (fullMortgage) {
      params.set("fullMortgage", "true");
    } else {
      params.delete("fullMortgage");
    }

    router.push(`?${params.toString()}`);
  }, [mortgage, rent, conversionCapability, fullMortgage]);

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>دکمه قیمت</AccordionTrigger>
      <AccordionContent>
        <div className="mt-6 px-2">
          <ul className="list-none">
            <li className="mb-2 flex items-center justify-between text-right text-lg hover:text-primary">
              <label htmlFor="mortgage" className="grow cursor-pointer">
                رهن
              </label>
              <Input
                id="mortgage"
                type="number"
                value={mortgage}
                onChange={(e) => setMortgage(e.target.value)}
                className="w-2/3"
                placeholder="مقدار به ریال"
              />
            </li>
            <li className="mb-2 flex items-center justify-between text-right text-lg hover:text-primary">
              <label htmlFor="rent" className="grow cursor-pointer">
                اجاره
              </label>
              <Input
                id="rent"
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                className="w-2/3"
                placeholder="مقدار به ریال"
              />
            </li>
            <li className="mb-2 flex items-center justify-between text-right text-lg hover:text-primary">
              <label
                htmlFor="conversionCapability"
                className="grow cursor-pointer"
                onClick={() => setConversionCapability(!conversionCapability)}
              >
                قابلیت تبدیل
              </label>
              <Checkbox
                id="conversionCapability"
                checked={conversionCapability}
                onChange={() => setConversionCapability(!conversionCapability)}
                onClick={() => setConversionCapability(!conversionCapability)}
              />
            </li>
            <div className="mb-2 flex items-center justify-between text-right text-lg hover:text-primary">
              <label
                htmlFor="fullMethod"
                className="grow cursor-pointer"
                onClick={() => {
                  setFullMortgage(!fullMortgage);
                }}
              >
                رهن کامل
              </label>
              <Checkbox
                id="fullMethod"
                checked={fullMortgage}
                onChange={() => {
                  setFullMortgage(!fullMortgage);
                }}
                onClick={() => {
                  setFullMortgage(!fullMortgage);
                }}
              />
            </div>
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default MortgagePriceFilter;
