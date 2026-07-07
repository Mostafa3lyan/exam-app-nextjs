import AuthSidebar from "@/components/layout/auth-sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-start min-h-screen">
      {/* Sidebar*/}
      <aside className="w-1/2 ">
        <AuthSidebar />
      </aside>

      {/* Main Content*/}
      <main className="w-1/2  ">
        {children}
      </main>
    </div>
  );
}
