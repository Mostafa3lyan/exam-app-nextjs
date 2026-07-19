import AuthSidebar from "@/components/layout/auth-sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col-reverse md:flex-row">
      <aside className="w-full md:w-1/2">
        <AuthSidebar />
      </aside>

      <main className="w-full md:w-1/2">
        {children}
      </main>
    </div>
  );
}
