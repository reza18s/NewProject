import BuyResidentialsPage from "@/components/home/BuyResidentialsPage";
import { db } from "@/lib/db"; // Assume db is a SQL connection instance

interface SearchParams {
  category?: string;
  tag?: string;
  search?: string;
  price?: string;
}

interface BuyResidentialsProps {
  searchParams: SearchParams;
}

async function BuyResidentials({ searchParams }: BuyResidentialsProps) {
  let query = "SELECT * FROM Profiles";
  const queryValues: Array<string | number> = [];
  const conditions: string[] = [];

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) {
        if (key === "search") {
          conditions.push("title LIKE ?");
          queryValues.push(`%${value}%`);
        } else if (key === "tag" && value.includes("-")) {
          const tags = value.split("-");
          const tagConditions = tags.map(() => "tag = ?").join(" OR ");
          conditions.push(`(${tagConditions})`);
          queryValues.push(...tags);
        } else if (key === "price" && value.includes("-")) {
          const [minPrice, maxPrice] = value.split("-").map(Number);
          if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            conditions.push("price BETWEEN ? AND ?");
            queryValues.push(minPrice, maxPrice);
          }
        } else {
          conditions.push(`${key} = ?`);
          queryValues.push(value);
        }
      }
    }

    if (conditions.length) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }
  }

  try {
    const [data] = await db.execute(query, queryValues);
    // @ts-expect-error the
    return <BuyResidentialsPage data={data} />;
  } catch (error) {
    return <BuyResidentialsPage data={[]} />;
  }
}

export default BuyResidentials;
