import MainHeader from "@/components/layout/main-header/main-header"
import { MainSidebar } from "@/components/layout/main-sidebar/main-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"



export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="m-4 w-full">
        <MainHeader/>
        {children}
      </main>
    </SidebarProvider>
  )
}