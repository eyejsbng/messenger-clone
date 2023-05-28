"use client";

import { User } from "@prisma/client"
import UserBox from "./UserBox";

interface UsersProps {
  items: User[]
}

const UserList = ({items}: UsersProps) => {
  return (
     <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
        <div className="px-5">
          <div className="flex-col">
            <div className="py-5 font-bold text-2xl text-neutral-700">
              People
            </div>
            <div className="flex-col">
              { items.map((item) => (
                <UserBox key={item.id} data={item}/>
              ))}
            </div>     
          </div>
        </div>
     </aside>
  )
}

export default UserList;