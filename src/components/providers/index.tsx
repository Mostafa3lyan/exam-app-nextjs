
import { EmailProvider } from "@/context/email-context";
import ReactQueryProvider from "./_components/react-query.provider";
import { NextAuthProvider } from "./_components/session.provider";
import { TanStackDevtools } from '@tanstack/react-devtools';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <EmailProvider>
              {children}
        <TanStackDevtools />
        </EmailProvider>
          </ReactQueryProvider>
    </NextAuthProvider>
  );
}
