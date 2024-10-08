"use client"
import useUser from '@/hooks/useUser';
import * as React from 'react';
import Cookies from "js-cookie"

interface IHomePageProps {
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const {user} = useUser();
    const accessToken = Cookies.get('accessToken')
  return <></>;
};

export default HomePage;
