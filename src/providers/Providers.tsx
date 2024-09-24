"use client";
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

interface IProvidersProps {
    children:React.ReactNode
}

const Providers: React.FunctionComponent<IProvidersProps> = ({children}) => {
  return <SessionProvider>
    {children}
  </SessionProvider>;
};

export default Providers;
