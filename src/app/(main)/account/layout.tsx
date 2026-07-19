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
    <div className="min-h-screen">
      <MainHeader
        rootLabel="Account Settings"
        rootHref="/account"
        pageLabel={pageLabel}
        isAccount
        backHref="/"
      />

      <div className="flex flex-col items-start gap-4 px-8 pb-8 md:flex-row md:px-0">
        <AccountSidebar />

        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}