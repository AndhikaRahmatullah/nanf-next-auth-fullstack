import { Metadata } from 'next';
import React from 'react';

// --------------------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
