import BuyResidentialsPage from "@/components/home/BuyResidentialsPage";
import { db } from "@/lib/db"; // Assume db is a SQL connection instance

async function BuyResidentials({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; tag: string };
}) {
  // Start building the SQL query
  let query = "SELECT * FROM Profiles";
  const queryValues: string[] = [];
  const conditions: string[] = [];

  if (searchParams) {
    // Build the WHERE conditions dynamically
    Object.keys(searchParams).forEach((key) => {
      if (key === "search") {
        conditions.push("title LIKE ?");
        queryValues.push(`%${searchParams[key]}%`);
      } else {
        conditions.push(`${key} = ?`);
        // @ts-expect-error the
        queryValues.push(searchParams[key]!);
      }
    });

    // If we have any conditions, append them to the query
    if (conditions.length) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }
  }

  try {
    // Execute the SQL query with conditions
    const [data] = await db.execute(query, queryValues);

    // @ts-expect-error the
    if (!data || data.length === 0) {
      return <h3>مشکلی پیش آمده است</h3>;
    }

    // @ts-expect-error the
    return <BuyResidentialsPage data={data} />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Database query failed: ", error);
    return <h3>مشکلی پیش آمده است</h3>;
  }
}

export default BuyResidentials;
