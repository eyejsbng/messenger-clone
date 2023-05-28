'use client';

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
  onClick?: () => void;

};
const DesktopItem = ({label,icon: Icon, href, active, onClick}: DesktopItemProps) => {

  const handleClick = () => {
    if(onClick) {
      return onClick();
    }
  }
  return (
    <li onClick={handleClick} key={label}>
      <Link href={href} 
            className={clsx(`
              group 
              flex 
              gap-x-3
              rounder-md 
              p-4
              w-full
              justify-center
              text-sm 
              leading-6 
              text-gray-7000
              font-semibold 
              hover:text-black 
              hover:bg-gray-100`,
              active && "bg-gray-100 text-black"
        )}>
        <Icon className="h-6 w-6 shrink-0"></Icon>
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem;