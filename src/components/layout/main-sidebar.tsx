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
      <SidebarContent className="bg-blue-50 flex flex-col min-h-screen">
        <SidebarGroup className="flex flex-col flex-1">
          <SidebarGroupLabel className="flex items-center justify-center my-8 px-4 md:my-10">
            <Image
              src="/Logo.svg"
              alt="Exam app logo"
              width={192}
              height={77}
              priority
              className="w-32 md:w-48"
            />
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex-1 px-3 md:px-4">
            <SidebarMenu className="my-5 gap-3">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/"}
                  className="w-full data-[active=true]:border data-[active=true]:rounded-none hover:rounded-none"
                >
                  <Link href="/" className="text-muted-foreground flex items-center gap-3">
                    <GraduationCap className="size-5" />
                    <span>Diplomas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/account")}
                  className="w-full data-[active=true]:border data-[active=true]:rounded-none hover:rounded-none"
                >
                  <Link href="/account" className="text-muted-foreground flex items-center gap-3">
                    <UserRound className="size-5" />
                    <span>Account Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarFooter className="mt-auto px-3 md:px-4 pb-4">
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
