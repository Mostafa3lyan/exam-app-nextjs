"use client";

import { Answer, Question } from "@/lib/types/question";

interface QuestionCardProps {
  question: Question;
  selectedAnswerId: string | null;
  onSelectAnswer: (answerId: string) => void;
}

export default function QuestionCard({
  question,
  selectedAnswerId,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-blue-600 mb-6">{question.text}</h2>

      <div className="flex flex-col gap-3">
        {question.answers.map((answer: Answer) => {
          const isSelected = selectedAnswerId === answer.id;

          return (
            <button
              key={answer.id}
              onClick={() => onSelectAnswer(answer.id)}
              className={`flex items-start sm:items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                isSelected
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div
                className={`size-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? "border-primary" : "border-gray-400"
                }`}
              >
                {isSelected && (
                  <div className="size-2.5 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-sm text-gray-700">{answer.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}