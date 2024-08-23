import BuyResidentialsPage from "@/components/home/BuyResidentialsPage";
import { db } from "@/lib/db";
import { Profile } from "@prisma/client";
async function BuyResidentials({ searchParams }: { searchParams: any }) {
  let data: Profile[] = [];
  if (searchParams.category && searchParams.search) {
    data = await db.profile.findMany({
      where: {
        title: { contains: searchParams.search },
        category: searchParams.category,
      },
    });
  } else if (searchParams.category) {
    data = await db.profile.findMany({
      where: { category: searchParams.category },
    });
  } else if (searchParams.search) {
    data = await db.profile.findMany({
      where: { title: { contains: searchParams.search } },
    });
  } else {
    data = await db.profile.findMany({});
  }

  if (!data) {
    return <h3>مشکلی پیش آمده است</h3>;
  }

  return <BuyResidentialsPage data={data} />;
}

export default BuyResidentials;
