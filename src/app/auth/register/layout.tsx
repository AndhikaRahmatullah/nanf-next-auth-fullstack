import { Metadata } from 'next';
import React from 'react';

// --------------------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Register',
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
