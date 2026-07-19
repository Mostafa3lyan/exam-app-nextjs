import MainHeader from "@/components/layout/main-header";
import DiplomaList from "./_components/diploma-list";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <MainHeader />
      <main className="container mx-auto px-4 py-8">
        <DiplomaList />
      </main>
    </>
  );
}