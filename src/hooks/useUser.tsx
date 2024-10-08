'use client';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useUser = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({});
     useEffect(() => {
         if (typeof window !== "undefined") {

             const storedUser = localStorage.getItem('user');

             if (storedUser) {

                 setUser(JSON.parse(storedUser));
             } else if (session?.user) {

               
                 setUser(session.user);
                 localStorage.setItem('user', JSON.stringify(session.user));
             }
            }
     }, [session]);

    return {user};
};

export default useUser;
