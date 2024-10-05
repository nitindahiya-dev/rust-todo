// app/layout.tsx (Server-Side layout)
import "./globals.css";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

import SessionWrapper from "@/components/SessionWrapper"; // Import client-side provider

export const metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <BackgroundGradientAnimation>
            {children}
          </BackgroundGradientAnimation>
        </SessionWrapper> {/* Wrap the children in SessionWrapper */}
      </body>
    </html>
  );
}
