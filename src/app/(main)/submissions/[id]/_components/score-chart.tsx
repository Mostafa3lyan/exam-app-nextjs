"use client";

interface ScoreChartProps {
  correct: number;
  wrong: number;
}

export default function ScoreChart({ correct, wrong }: ScoreChartProps) {
  const total = correct + wrong;
  const correctPercent = total > 0 ? correct / total : 0;

  const radius = 60;
  const strokeWidth = 30;
  const circumference = 2 * Math.PI * radius;
  const correctDash = circumference * correctPercent;
  const wrongDash = circumference * (1 - correctPercent);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#ef4444"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#22c55e"
          strokeWidth={strokeWidth}
          strokeDasharray={`${correctDash} ${wrongDash}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="butt"
        />
      </svg>

      <div className="flex flex-col gap-2 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm bg-green-500 inline-block" />
          Correct: {correct}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm bg-red-500 inline-block" />
          Incorrect: {wrong}
        </span>
      </div>
    </div>
  );
}