"use client";

import NavUser from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GraduationCap, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

export function MainSidebar() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <Sidebar className="border-none">
<SidebarContent className="bg-blue-50  flex flex-col h-full">
  <SidebarGroup className="flex  flex-col flex-1">
    <SidebarGroupLabel className="flex my-10">
      <Image
        src="/Logo.svg"
        alt="Exam app logo"
        width={192}
        height={77}
        priority
      />
    </SidebarGroupLabel>

    <SidebarGroupContent className="flex-1 pl-3">
      <SidebarMenu className="my-5 gap-3">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
                  isActive={pathname === "/"}
            className="w-10/12 data-[active=true]:border data-[active=true]:rounded-none hover:rounded-none"
          >
                  <Link href="/" className="text-muted-foreground flex items-center gap-2">
              <GraduationCap /> Diplomas
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith("/account")}
            className="w-10/12 data-[active=true]:border data-[active=true]:rounded-none hover:rounded-none"
          >
                  <Link href="/account" className="text-muted-foreground flex items-center gap-2">
                    <UserRound /> Account Settings
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>

    <SidebarFooter className="mt-auto">
            <NavUser
        user={{
          name: session.data?.user?.username || "",
          email: session.data?.user?.email || "",
          avatar: "",
        }}
      />
    </SidebarFooter>
  </SidebarGroup>
</SidebarContent>

    </Sidebar>
  );
}
