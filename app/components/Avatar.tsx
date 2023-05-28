"use client";

import { User } from "@prisma/client"
import Image from "next/image";

interface AvatarProps { 
  user: User;
}
const Avatar = ({user}: AvatarProps) => {
  return (
    <div className="relative">
       <div className="p-2 relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 ring-2 ring-gray-300">
        <Image src={user.image! || '/images/avatar_placeholder.png'} alt={user.name!} fill/>
       </div>
       <span className="absolute block rounded-full bg-green-500 ring-2 ring-white h-2 w-2 top-0 right-0 md:h-3 md:w-3"/>
    </div>
  )
}

export default Avatar