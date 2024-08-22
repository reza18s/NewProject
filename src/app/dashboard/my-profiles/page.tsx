import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import MyProfilesPage from '@/components/dashboard/MyProfilesPage';
import { Profile } from '@prisma/client';

async function Myprofiles() {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect('/signin');
  }

  const user = await db.users.aggregateRaw({
    pipeline: [
      {
        $match: {
          email: session.user.email,
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'profiles',
          foreignField: '_id',
          as: 'profiles',
        },
      },
    ],
  });
  // @ts-ignore
  return <MyProfilesPage profiles={user[0].profiles as Profile[]} />;
}

export default Myprofiles;
