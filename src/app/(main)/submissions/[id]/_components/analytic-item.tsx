import { AnalyticsItem } from "@/lib/types/submissions";

export default function AnalyticsCard({ item }: { item: AnalyticsItem }) {
  return (
    <div className="pb-4">
      <h3 className="text-blue-600 font-bold mb-3">{item.questionText}</h3>

      <div className="flex flex-col gap-2">
        {/* Selected answer or not answered */}
        {item.selectedAnswer ? (
          <div
            className={`flex items-center gap-3 p-3 ${
              item.isCorrect ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div
              className={`size-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                item.isCorrect ? "border-green-500" : "border-red-500"
              }`}
            >
              <div
                className={`size-2.5 rounded-full ${
                  item.isCorrect ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
            <span className="text-sm text-gray-700">
              {item.selectedAnswer.text}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-red-50">
            <div className="size-5 rounded-full border-2 border-red-500 flex items-center justify-center flex-shrink-0">
              <div className="size-2.5 rounded-full bg-red-500" />
            </div>
            <span className="text-sm text-red-500 font-medium">
              Not answered
            </span>
          </div>
        )}

        {/* Correct answer — only show if wrong or unanswered */}
        {!item.isCorrect && (
          <div className="flex items-center gap-3 p-3 bg-green-50">
            <div className="size-5 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0">
              <div className="size-2.5 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-gray-700">
              {item.correctAnswer.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}