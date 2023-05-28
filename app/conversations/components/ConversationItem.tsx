"use client";

import { useCallback, useMemo  } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns"
import { useSession } from "next-auth/react"; 
import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationItemProps {
  data: FullConversationType
  selected?: boolean
}

const ConversationItem = ({data, selected}: ConversationItemProps) => {
  const otherUser = useOtherUser(data);
  const session = useSession()
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  },[data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages])

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  },[userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image'
    }
    if (lastMessage?.body) {
      return lastMessage.body
    }
    
    return 'Start a conversation'
  }, [lastMessage]);

  return (
    <div onClick={handleClick} 
         className={clsx(`w-full relative flex items-center space-x-3 
          hover:bg-neutral-100 rounded-lg transition cursor-pointer p-2`,
          selected ? 'bg-neutral-100' : 'bg-white'
    )}>
      {data.isGroup ? (
        <AvatarGroup users={data.users}/>
      ): (
        <Avatar user={otherUser}/>
      )
      }
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <div className="justify-between flex items-center mb-1">
            <p className="font-bold">
              { data.name || otherUser.name }
            </p> 
            {lastMessage?.createAt && (
              <p className="text-xs text-gray-500 font-light">
                { format(new Date(lastMessage?.createAt), 'p') }
              </p>
            )}
          </div>
          <p className={clsx(`text-sm truncate`, hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
              { lastMessageText }
            </p> 
        </div>
       
      </div>
    </div>    
  )
}

export default ConversationItem;