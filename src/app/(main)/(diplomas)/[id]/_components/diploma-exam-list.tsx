"use client";

import MainHeader from "@/components/layout/main-header";
import { useDiplomaExams } from "../_hooks/use-diploma-exams";
import DiplomaExamCardSkeleton from "./diploma-exam-card-skeleton";
import DiplomaExamCard from "./diploma-exam-cards";


export default function DiplomaExamList({ id }: { id: string }) {
  const { data: diplomaExams, isLoading, isError, error } = useDiplomaExams(id);

  if (isError) {
    return <p className="text-destructive">{error?.message}</p>;
  }

  return (
    <>
      <MainHeader
        diplomaId={id}
        diplomaTitle={diplomaExams?.title}
      />

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-2.5">
            {Array.from({ length: 6 }, (_, i) => (
              <DiplomaExamCardSkeleton key={i} />
            ))}
          </div>
        ) : diplomaExams?.exams.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No exams found.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {diplomaExams?.exams.map((exam) => (
              <DiplomaExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}