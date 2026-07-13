"use client";

import { memo, useEffect, useState } from "react";

interface CircularTimerProps {
  examId: string;
  durationMinutes: number;
  onTimeUp: () => void;
}

export default memo(function CircularTimer({
  examId,
  durationMinutes,
  onTimeUp,
}: CircularTimerProps) {
  const totalSeconds = durationMinutes * 60;
  const storageKey = `exam-${examId}-endTime`;
  const refreshKey = `exam-${examId}-refresh`;

  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    // Detect refresh
    const handleBeforeUnload = () => {
      sessionStorage.setItem(refreshKey, "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Get or create end time
    let endTime = sessionStorage.getItem(storageKey);

    if (!endTime) {
      endTime = (
        Date.now() +
        durationMinutes * 60 * 1000
      ).toString();

      sessionStorage.setItem(storageKey, endTime);
    }

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.floor((Number(endTime) - Date.now()) / 1000)
      );

      setSecondsLeft(remaining);

      if (remaining <= 0) {
        sessionStorage.removeItem(storageKey);
        sessionStorage.removeItem(refreshKey);
        onTimeUp();
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      const isRefresh = sessionStorage.getItem(refreshKey);

      if (isRefresh) {
        sessionStorage.removeItem(refreshKey);
      } else {
        // User navigated away → reset timer next time
        sessionStorage.removeItem(storageKey);
      }
    };
  }, [durationMinutes, examId, onTimeUp, refreshKey, storageKey]);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = secondsLeft / totalSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (secondsLeft % 60)
    .toString()
    .padStart(2, "0");

  return (
    <div className="relative flex items-center justify-center size-16">
      <svg className="absolute" width="64" height="64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="6"
          className="stroke-blue-100"
        />

        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="stroke-primary transition-all duration-1000"
        />
      </svg>

      <span className="z-10 text-xs font-semibold text-gray-700">
        {minutes}:{seconds}
      </span>
    </div>
  );
});