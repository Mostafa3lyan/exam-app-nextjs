"use client";

import { User, Lock, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/shadcn/utils";

const links = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/change-password", label: "Change Password", icon: Lock },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 flex-shrink-0 flex flex-col justify-between min-h-[calc(100vh-160px)] py-4">
      <div className="flex flex-col gap-1 px-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50"
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="px-2">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
        >
          <LogOut className="size-4 rotate-180" />
          Logout
        </button>
      </div>
    </div>
  );
}