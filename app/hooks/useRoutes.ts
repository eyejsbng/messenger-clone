import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { TbUsers } from "react-icons/tb"

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiOutlineChatAlt2,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: TbUsers,
      active: pathname === '/users'
    },
    {
      label: 'Logout', 
      href: '/',
      onClick: () => signOut({ callbackUrl: '/'}),
      icon: HiArrowLeftOnRectangle
    }
  ], [pathname, conversationId])

  return routes;
}

export default useRoutes;
