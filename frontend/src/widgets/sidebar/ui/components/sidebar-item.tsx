import React from "react";
import clsx from "classnames";
import { Link } from "react-router-dom";

export interface SidebarItemProps {
  active?: boolean;
  popular?: boolean;
  title: string;
  to: string;
  children: React.ReactNode;
}

export const SidebarItem = ({
  active,
  popular,
  title,
  to,
  children,
}: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={clsx(
        "flex w-full cursor-pointer items-center gap-3 px-5 py-5 text-blue duration-150",
        {
          "bg-gray-200": active,
          "hover:bg-gray-100 hover:opacity-95": !active,
          "border-r-[5px] border-r-blue": popular,
          "px-6": !popular,
        }
      )}
    >
      {children}
      <p className="text-[15px]">{title}</p>
    </Link>
  );
};
