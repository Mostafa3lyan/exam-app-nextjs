import { MainSidebar } from "@/components/layout/main-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"



export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="m-4 w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}