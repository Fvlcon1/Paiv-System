import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./components/loader.css";
import Topbar from "@components/topbar/topbar";
import { MainContextProvider } from "./context/context";
import QueryProvider from "./QueryProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAIV System",
  description: "PAIV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <QueryProvider> {/* ✅ Wrap children in QueryProvider */}
          <MainContextProvider>
            <Topbar />
            {children}
          </MainContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
