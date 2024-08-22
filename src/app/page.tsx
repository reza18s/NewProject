import BuyResidentialsPage from '@/components/home/BuyResidentialsPage';
import { db } from '@/lib/db';
async function BuyResidentials({ searchParams }: { searchParams: any }) {
  const normalizeSearchQuery = Object.keys(searchParams)
    .map((el) => el + '=' + searchParams[el])
    .join('&');
  const data = await db.profile.findMany({});

  if (!data) return <h3>مشکلی پیش آمده است</h3>;
  // console.log(finalData);
  // if (searchParams.category) {
  //   finalData = finalData.filter((i) => i.category === searchParams.category);
  // }

  return <BuyResidentialsPage data={data} />;
}

export default BuyResidentials;
