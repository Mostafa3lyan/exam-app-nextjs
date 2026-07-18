"use client";

interface ProgressBarProps {
  currentStep: number;
  steps: number;
}

export function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  return (
    <div
      className="flex w-full items-center"
      role="progressbar"
      aria-label={`Step ${currentStep} of ${steps}`}
    >
      {Array.from({ length: steps }).map((_, index) => {
        const isCompleted = index < currentStep - 1;
        const isActive = index === currentStep - 1;

        return (
          <div key={index} className="contents">
            {/* Node */}
            <div className="relative z-10 flex flex-shrink-0 items-center justify-center px-1">
              {isActive && (
                <div className="absolute h-6 w-6 rotate-45 bg-blue-300/40" />
              )}
              <div
                className={`h-3 w-3 rotate-45 transition-all ${
                  isCompleted || isActive
                    ? "bg-primary"
                    : "border-2 border-primary bg-white"
                }`}
              />
            </div>

            {/* Connector */}
            {index < steps - 1 && (
              <div className="mx-2 h-0.5 flex-1">
                <div
                  className={`h-full transition-all ${
                    isCompleted
                      ? "bg-primary"
                      : "border-t-2 border-dashed border-primary"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}