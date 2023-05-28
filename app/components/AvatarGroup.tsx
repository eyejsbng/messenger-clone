"use client"

import { User } from "@prisma/client"
import Avatar from "./Avatar"
import Image from "next/image"

interface AvatarGroupProps {
  users?: User[]
}
const AvatarGroup = ({users}: AvatarGroupProps) => {
  const slicedUsers = users?.slice(0,2);
  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
  }
  
  const remainingUser = (Number(users?.length) - Number(slicedUsers?.length))
  return (
    <div className="relative h-11 w-11">
      {slicedUsers?.map((user, index) => (
        <div key={user.id} className={` ring-1 p-1 ring-gray-300 dark:ring-sky-500 absolute inline-block rounded-full overflow-hidden h-[32px] w-[32px] ${positionMap[index as keyof typeof positionMap]}`}>
          <Image alt="Profile Avatar" src={user?.image || '/images/avatar_placeholder.png'} width="30" height="30"/>
        </div> 
      ))
      }
  
      <span className="absolute flex right-0 items-center bottom-0 z-[50]
      justify-center h-[27px] w-[27px] text-xs pt-[-3px]
      font-medium text-white bg-gray-700
        border-white rounded-full hover:bg-gray-600 dark:border-gray-800">+ {remainingUser}</span> 
    </div>
  )
}

export default AvatarGroup