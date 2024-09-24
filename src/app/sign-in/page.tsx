"use client";
import { signIn } from 'next-auth/react';
import * as React from 'react';

interface ISignInPageProps { }

const SignInPage: React.FunctionComponent<ISignInPageProps> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h3 className="text-2xl font-bold mb-8">Welcome, Please Sign In</h3>

      <button
        onClick={() => signIn('google',{callbackUrl:"/"})}
        className="flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-lg shadow-lg px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out"
        aria-label="Sign in with Google"
      >
     
        <span className="text-lg">Sign in with Google</span>
      </button>
    </div>
  );
};

export default SignInPage;
