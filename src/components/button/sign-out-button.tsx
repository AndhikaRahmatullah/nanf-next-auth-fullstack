'use client';

import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';

// --------------------------------------------------------------------------------------

const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignOut = useCallback(async () => {
    setIsLoading(true);

    try {
      await signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/auth/sign-in`,
      });
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }, []);

  return (
    <button onClick={onSignOut} disabled={isLoading} className="btn btn-lg mt-10 w-52 border-neutral-300 bg-neutral-300 hover:border-neutral-400 hover:bg-neutral-400">
      {!isLoading ? 'Sign Out' : 'Loading...'}
    </button>
  );
};

export default SignOutButton;
