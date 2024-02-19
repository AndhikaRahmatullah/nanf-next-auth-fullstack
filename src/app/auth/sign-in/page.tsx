'use client';

import React, { SyntheticEvent, useCallback, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// --------------------------------------------------------------------------------------

export default function SignIn() {
  const [username, setUsername] = useState<string>('dikarahmat');

  const [password, setPassword] = useState<string>('123456');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsLoading(true);

      try {
        const signinData = await signIn('credentials', {
          username,
          password,
          redirect: false,
        });

        if (signinData?.ok) {
          router.push('/');
          router.refresh();
        } else {
          console.error('error');
        }
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    },
    [username, password, router],
  );

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-800 p-10">
      <div className="font-lora text-4xl font-bold uppercase tracking-widest text-white">Sign In</div>

      <form onSubmit={onSubmit} className="mt-10 flex w-full max-w-[30%] flex-col items-center justify-center gap-3">
        <label className="input input-bordered flex w-full items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="grow" placeholder="Username" />
        </label>

        <label className="input input-bordered flex w-full items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="grow" placeholder="Password" />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-outline mt-3 w-full border-white font-open-sans text-white hover:bg-white hover:text-black  disabled:bg-neutral-400 disabled:text-black"
        >
          {!isLoading ? 'Sign In' : 'Loading...'}
        </button>

        <div className="flex w-full justify-center">
          <Link href="/auth/register" className="text-sm text-white underline">
            Register
          </Link>
        </div>
      </form>
    </section>
  );
}
