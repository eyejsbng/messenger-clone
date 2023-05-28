"use client"

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react";

interface UserProps {
  data: User;
}
const UserBox = ({data}: UserProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios.post('/api/conversations', {
      userId: data.id
    })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`)
    })
    .finally(() => setIsLoading(false))
  }, [data, router])
  
  return (
    <>
    {isLoading && (
      <LoadingModal/>
    )   
    }
    <div onClick={handleClick} className="relative flex w-full items-center bg-white p-3 space-x-3 rounded-lg hover:bg-neutral-100 cursor-pointer transition">
      <Avatar user={data}/>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between mb-1">
            <p className="text-sm font-medium text-gray-700">
              {data.name}
            </p>
          </div>
        </div>
      </div>  
    </div>
    </>
  )
}

export default UserBox;