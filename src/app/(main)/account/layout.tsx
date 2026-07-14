"use client";

import MainHeader from "@/components/layout/main-header";
import AccountSidebar from "./_components/account-sidebar";
import { usePathname } from "next/navigation";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const pageLabel =
    pathName === "/account"
      ? "Profile"
      : pathName === "/account/change-password"
      ? "Change Password"
      : "Account";

  return (
    <>
      <MainHeader
        rootLabel="Account Settings"
        rootHref="/account"
        pageLabel={pageLabel}
        isAccount
        backHref="/"
      />

      <div className="flex">
        <AccountSidebar />

        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </>
  );
}