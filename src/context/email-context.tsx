"use client";
import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

type EmailContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
} | undefined;

const EmailContext = createContext<EmailContextType>(undefined);

export function EmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useEmail must be used within a EmailProvider");
  }
  return context;
}