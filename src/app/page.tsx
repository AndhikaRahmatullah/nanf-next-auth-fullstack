import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { User } from '@/components/user';
import { authOptions } from '@/lib/auth';
import { SignOutButton } from '@/components/button';

// --------------------------------------------------------------------------------------

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-800 p-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className={session ? 'aspect-auto h-10 w-10 rounded-full bg-green-500' : 'aspect-auto h-10 w-10 rounded-full bg-red-500'} />

        <p className="font-lora text-6xl font-bold uppercase tracking-widest text-white">{session ? 'authenticated' : 'unauthenticated'}</p>
      </div>

      {session ? (
        <SignOutButton />
      ) : (
        <Link href="/auth/sign-in" className="btn btn-lg mt-10 w-52 border-neutral-300 bg-neutral-300 hover:border-neutral-400 hover:bg-neutral-400">
          Sign In
        </Link>
      )}

      <div className="mt-10 text-white">
        <p className="">Client Session</p>
        <User />
        <p className="">Server Session</p>
        <pre>{JSON.stringify(session)}</pre>
      </div>
    </section>
  );
}
