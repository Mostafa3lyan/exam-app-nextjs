"use client";

interface ProgressBarProps {
  currentStep: number;
  steps: number;
}

export function ProgressBar({ currentStep, steps }: ProgressBarProps) {
  return (
    <div
      className="w-full"
      role="progressbar"
      aria-label={`Step ${currentStep} of ${steps}`}
    >
      <div className="flex items-center">
        {Array.from({ length: steps }).map((_, index) => {
          const isCompleted = index < currentStep - 1;
          const isActive = index === currentStep - 1;

          return (
            <div key={index} className="flex flex-1 items-center">
              {/* Node */}
              <div className="relative z-10 flex items-center justify-center flex-shrink-0 px-2">
                {/* Glow ring*/}
                {isActive && (
                  <div className="absolute h-8 w-8 rotate-45 bg-blue-300/40" />
                )}
                {/* Inner diamond */}
                <div
                  className={`h-4 w-4 rotate-45 transition-all ${
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
    </div>
  );
}