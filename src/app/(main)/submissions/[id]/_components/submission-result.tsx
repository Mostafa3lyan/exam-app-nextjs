"use client";

import { SubmissionResult as SubmissionResultType } from "@/lib/types/submissions";
import { Button } from "@/components/ui/button";
import { RotateCcw, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import ScoreChart from "./score-chart";
import MainHeader from "@/components/layout/main-header";
import AnalyticsCard from "./analytic-item";
import { Exam } from "@/lib/types/exams";

export default function SubmissionResult({
  result,
  examData: { exam },
}: {
  result: SubmissionResultType;
  examData: { exam: Exam };
}) {
  const router = useRouter();
  const { submission, analytics } = result;

  return (
    <>
            <MainHeader
              diplomaId={exam.diplomaId}
              diplomaTitle={exam.diploma?.title}
              examTitle={submission.examTitle}
              backHref={`/${exam.diplomaId}`}
            />

      <div className="container mx-auto px-4 py-8">
        {/* Progress bar — full since exam is done */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
          <span className="text-sm text-gray-600 font-mono">
            {submission.examTitle}
          </span>
          <span className="text-sm text-gray-600">
            Question{" "}
            <strong className="text-primary font-semibold">
              {submission.totalQuestions}
            </strong>{" "}
            of {submission.totalQuestions}
          </span>
        </div>
        <div className="w-full h-2 bg-primary rounded-full mb-8" />

        <h2 className="text-2xl font-bold text-blue-600 mb-6">Results:</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Score chart */}
          <div className="w-full lg:w-72 lg:flex-shrink-0 bg-blue-50 p-6 flex items-center justify-center">
            <ScoreChart
              correct={submission.correctAnswers}
              wrong={submission.wrongAnswers}
            />
          </div>

          {/* Analytics list */}
          <div className="flex-1 border border-dashed border-blue-200 p-6 max-h-[500px] overflow-y-auto flex flex-col gap-4">
            {analytics.map((item) => (
              <AnalyticsCard key={item.questionId} item={item} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-8 flex-col sm:flex-row">
          <Button
            variant="secondary"
            className="flex-1 h-14 text-base"
            onClick={() => router.push(`/exams/${submission.examId}`)}
          >
            <RotateCcw className="size-4 mr-2" />
            Restart
          </Button>

          <Button
            className="flex-1 h-14 text-base bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/")}
          >
            <LayoutGrid className="size-4 mr-2" />
            Explore
          </Button>
        </div>
      </div>
    </>
  );
}