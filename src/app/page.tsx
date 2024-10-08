
import { getServerSession } from "next-auth";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/options";
import axiosInstance from "./lib/nextAuthInsetptures";
import useUser from "@/hooks/useUser";
import ExchangeCard from "@/components/ExchangeRate";

export default async function Home() {
  // const result = await axiosInstance.get("/user/profile");
  // console.log(result)
  // const profileData = await result?.data;
  // console.log(profileData);
 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-red-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full relative transform transition duration-500 hover:scale-105">
        <div className="flex justify-center mb-4 relative">
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            // src={profileData?.data.imageUrl || "/default-avatar.png"}
            alt="Profile Image"
          />
        </div>

        <h4 className="text-center text-2xl font-extrabold uppercase mb-2 text-gray-900">
          {/* {profileData?.data.name} */}
        </h4>
        <h5 className="text-center text-lg text-gray-600 mb-1">
          {/* {profileData?.data.email} */}
        </h5>
        <h5 className="text-center text-lg text-gray-500 mb-1 italic">
          {/* Status: {profileData?.data.status || "N/A"} */}
        </h5>
        <h5 className="text-center text-lg text-gray-600 mb-4">
          {/* Username: {profileData?.data.username || "Unknown"} */}
        </h5>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 transition duration-300 ease-in-out">
            Edit Profile
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-300 transition duration-300 ease-in-out">
            View Profile
          </button>
        </div>

        {/* Background Decoration */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-pink-50 w-40 h-40 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <ExchangeCard />
    </div>
  );
}
