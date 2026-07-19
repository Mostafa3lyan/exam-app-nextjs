import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo } from "react";

interface QuestionNavigationProps {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default memo(function QuestionNavigation({
  currentIndex,
  total,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
}: QuestionNavigationProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <div className="flex gap-2 my-8 flex-col sm:flex-row">
      <Button
        variant="secondary"
        className="flex-1 h-14 text-base"
        onClick={onPrevious}
        disabled={isFirst}
      >
        <ChevronLeft className="size-4 mr-1" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {isLast ? (
        <Button
          className="flex-1 h-14 text-base bg-blue-600 hover:bg-blue-700"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      ) : (
        <Button
          className="flex-1 h-14 text-base bg-blue-600 hover:bg-blue-700"
          onClick={onNext}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-4 ml-1" />
        </Button>
      )}
    </div>
  );
});