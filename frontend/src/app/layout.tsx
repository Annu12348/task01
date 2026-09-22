import ReduxProvider from "../features/redux/provider";
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ 
  children,
 }: {
  children: ReactNode
 }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
