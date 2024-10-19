import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";

function PriceFilter({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [one, setOne] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (minPrice || maxPrice) {
        params.set("price", `${minPrice || "0"}-${maxPrice || "0"}`);
      } else {
        params.delete("price");
      }
      if (one) {
        router.push(`?${params.toString()}`); // This should correctly update the URL
      } else {
        setOne(true);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [minPrice, maxPrice]);

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>قیمت</AccordionTrigger>
      <AccordionContent className="p-2">
        <div className="flex items-center justify-between">
          <Label>حداقل</Label>
          <Input
            className="h-6 w-4/5"
            type="number"
            onChange={(e) => setMinPrice(e.target.value)}
            value={minPrice}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>حداکثر</Label>
          <Input
            className="h-6 w-4/5"
            type="number"
            onChange={(e) => setMaxPrice(e.target.value)}
            value={maxPrice}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default PriceFilter;
