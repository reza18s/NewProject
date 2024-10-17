import React, { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";

function MeterageFilter({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minMeterage, setMinMeterage] = useState<number>();
  const [maxMeterage, setMaxMeterage] = useState<number>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (minMeterage || maxMeterage) {
        params.set("meterage", `${minMeterage || "0"}-${maxMeterage || "0"}`);
      } else {
        params.delete("meterage");
      }
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [minMeterage, maxMeterage]);

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>متراژ</AccordionTrigger>
      <AccordionContent className="p-2">
        <div className="flex items-center justify-between">
          <Label>حداقل</Label>
          <Input
            className="h-6 w-4/5"
            type="number"
            onChange={(e) => setMinMeterage(+e.target.value)}
            value={minMeterage}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Label>حداکثر</Label>
          <Input
            className="h-6 w-4/5"
            type="number"
            onChange={(e) => setMaxMeterage(+e.target.value)}
            value={maxMeterage}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default MeterageFilter;
