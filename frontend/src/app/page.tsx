import BuyResidentialsPage from "@/components/home/BuyResidentialsPage";
import { db } from "@/lib/db";
async function BuyResidentials({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const where = {};
  if (searchParams) {
    Object.keys(searchParams).map((key) => {
      if (key == "search") {
        //@ts-expect-error the
        where.title = { contains: searchParams[key] };
      } else {
        //@ts-expect-error the
        where[key] = searchParams[key];
      }
    });
  }
  const data = await db.profiles.findMany({ where: where });

  if (!data) {
    return <h3>مشکلی پیش آمده است</h3>;
  }

  return <BuyResidentialsPage data={data} />;
}

export default BuyResidentials;
