import { currentUser } from '@clerk/nextjs';
import { Utensils, ChefHat } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import prismadb from '@/lib/db';

const SetupPage = async () => {
  const authUser = await currentUser();

  if (!authUser) {
    redirect('/sign-in');
  }

  const user = await prismadb.user.findUnique({
    where: { authId: authUser.id },
  });

  const restaurant = await prismadb.restaurant.findUnique({
    where: { authId: authUser.id },
  });

  if (user) {
    redirect('/eater');
  }

  if (restaurant) {
    redirect('/cooker');
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-10">
      <h1 className="font-bold text-3xl">Choose your role!</h1>
      <div className="flex gap-x-5 md:gap-x-10">
        <Link
          href="/eater/create"
          className="flex flex-col relative gap-y-3 items-center justify-center border-2 rounded-xl p-5 md:p-10 border-stone-900 dark:border-stone-200 hover:bg-stone-900  transition duration-200 group hover:text-stone-200"
        >
          <Utensils size={50} className="group-hover:animate-bounce" />
          <p className="font-bold">I am eater</p>
          <div className="absolute bottom-0 right-0 bg-stone-100 px-4 translate-y-1/2 -translate-x-[15%] rounded-2xl">
            <div className="text-stone-900 font-bold text-sm">Free</div>
          </div>
        </Link>

        <Link
          href="/cooker/create"
          className="flex flex-col relative gap-y-3 items-center justify-center border-2 rounded-xl p-5 md:p-10 border-stone-900 dark:border-stone-200 hover:bg-stone-900  transition duration-200 group hover:text-stone-200"
        >
          <ChefHat size={50} className="group-hover:animate-bounce" />
          <p className="font-bold">I am cooker</p>
          <div className="absolute bottom-0 right-0 bg-stone-100 px-4 translate-y-1/2 -translate-x-[15%] rounded-2xl">
            <div className="text-stone-900 font-bold text-sm">299$ mo</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SetupPage;
