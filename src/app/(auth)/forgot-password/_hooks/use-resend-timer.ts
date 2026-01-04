import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "otp-resend-end-time";

export function useResendTimer(duration = 60) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [canResend, setCanResend] = useState(true);

    // Calculate remaining time from storage
    const calculateTimeLeft = useCallback(() => {
        const endTime = sessionStorage.getItem(STORAGE_KEY);

        if (!endTime) {
            return 0;
        }

        const remaining = Math.floor((Number(endTime) - Date.now()) / 1000);
        return Math.max(0, remaining);
    }, []);

    // Initialize and sync timer state
    useEffect(() => {
        const remaining = calculateTimeLeft();

        if (remaining > 0) {
            setTimeLeft(remaining);
            setCanResend(false);
        } else {
            sessionStorage.removeItem(STORAGE_KEY);
            setTimeLeft(0);
            setCanResend(true);
        }
    }, [calculateTimeLeft]);

    // Handle countdown interval
    useEffect(() => {
        if (timeLeft <= 0) {
            return;
        }

        const interval = setInterval(() => {
            const remaining = calculateTimeLeft();

            if (remaining <= 0) {
                sessionStorage.removeItem(STORAGE_KEY);
                setTimeLeft(0);
                setCanResend(true);
                clearInterval(interval);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, calculateTimeLeft]);

    // Sync across tabs/windows
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                const remaining = calculateTimeLeft();

                if (remaining > 0) {
                    setTimeLeft(remaining);
                    setCanResend(false);
                } else {
                    setTimeLeft(0);
                    setCanResend(true);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [calculateTimeLeft]);

    // Start the timer
    const startTimer = useCallback(() => {
        const endTime = Date.now() + duration * 1000;
        sessionStorage.setItem(STORAGE_KEY, endTime.toString());
        setTimeLeft(duration);
        setCanResend(false);
    }, [duration]);

    // Reset the timer
    const resetTimer = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setTimeLeft(0);
        setCanResend(true);
    }, []);

    return {
        timeLeft,
        canResend,
        startTimer,
        resetTimer,
    };
}