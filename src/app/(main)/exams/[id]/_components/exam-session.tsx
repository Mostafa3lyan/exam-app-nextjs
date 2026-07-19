"use client";

import MainHeader from "@/components/layout/main-header";
import { Exam } from "@/lib/types/exams";
import { Question } from "@/lib/types/question";
import { useCallback, useMemo, useState } from "react";
import { useSubmitExam } from "../_hooks/use-submit-exam";
import CircularTimer from "./circular-timer";
import QuestionCard from "./questions-card";
import QuestionNavigation from "./questions-navigation";
import ErrorComponent from "@/components/shared/error-component";

interface ExamSessionProps {
  questions: Question[];
  exam: Exam;
}

export default function ExamSession({ questions, exam }: ExamSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

const { submitExam, isPending: isSubmitting , error} = useSubmitExam();


  const total = questions.length;

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex]
  );

  const startedAt = useMemo(() => new Date().toISOString(), []);
  const handleSelectAnswer = useCallback((answerId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerId }));
  }, [currentQuestion.id]);

  const handlePrevious = useCallback(() => setCurrentIndex((i) => i - 1), []);
  const handleNext = useCallback(() => setCurrentIndex((i) => i + 1), []);


const handleSubmit = useCallback(() => {
  submitExam({
    examId: exam.id,
    startedAt,
    answers: Object.entries(answers).map(([questionId, answerId]) => ({
      questionId,
      answerId,
    })),
  });
}, [answers, exam.id, startedAt, submitExam]);

  return (
    <>
      <MainHeader
        diplomaId={exam.diplomaId}
        diplomaTitle={exam.diploma?.title}
        examTitle={exam.title}
        backHref={`/${exam.diplomaId}`}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-2">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
              <span className="text-sm text-gray-600 font-mono truncate">
                {exam.diploma?.title} - {exam.title}
              </span>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Question{" "}
                <strong className="text-primary font-semibold">
                  {currentIndex + 1}
                </strong>{" "}
                of {total}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex-shrink-0">
            <CircularTimer examId={exam.id} durationMinutes={exam.duration} onTimeUp={handleSubmit} />
          </div>
        </div>

        <div className="mt-8">
          <QuestionCard
            question={currentQuestion}
            selectedAnswerId={answers[currentQuestion.id] ?? null}
            onSelectAnswer={handleSelectAnswer}
          />
        </div>

        <QuestionNavigation
          currentIndex={currentIndex}
          total={total}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        {error && (
          <ErrorComponent errorMessage={error.message} />
        )}
      </div>
    </>
  );
}