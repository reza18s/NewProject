import BuyResidentialsPage from "@/components/home/BuyResidentialsPage";
import { db } from "@/lib/db";
import { Profiles } from "@prisma/client";
async function BuyResidentials({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  let data: Profiles[] = [];
  if (searchParams.category && searchParams.search) {
    data = await db.profiles.findMany({
      where: {
        title: { contains: searchParams.search },
        category: searchParams.category,
      },
    });
  } else if (searchParams.category) {
    data = await db.profiles.findMany({
      where: { category: searchParams.category },
    });
  } else if (searchParams.search) {
    data = await db.profiles.findMany({
      where: { title: { contains: searchParams.search } },
    });
  } else {
    data = await db.profiles.findMany({});
  }

  if (!data) {
    return <h3>مشکلی پیش آمده است</h3>;
  }

  return <BuyResidentialsPage data={data} />;
}

export default BuyResidentials;
