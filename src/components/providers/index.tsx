
import ReactQueryProvider from "./_components/react-query.provider";
import { NextAuthProvider } from "./_components/session.provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
          <ReactQueryProvider>
              {children}
          </ReactQueryProvider>
    </NextAuthProvider>
  );
}
