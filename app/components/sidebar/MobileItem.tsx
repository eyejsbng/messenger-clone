'use client';

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
  onClick?: () => void;

};
const MobileItem = ({label,icon: Icon, href, active, onClick}: MobileItemProps) => {

  const handleClick = () => {
    if(onClick) {
      return onClick();
    }
  }
  return (
    <Link href={href} onClick={handleClick}
          className={clsx(`
            group 
            flex 
            gap-x-3
            rounder-md 
            text-sm 
            leading-6 
            font-semibold
            w-full
            justify-center
            p-4
            text-gray-600
      `,
            active && "bg-gray-100 text-black"
      )}> 
      <Icon className="h-6 w-6"></Icon>
    </Link>
  )
}

export default MobileItem;