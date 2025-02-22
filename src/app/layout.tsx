import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import "./components/loader.css"
import Topbar from "@components/topbar/topbar";
import { MainContextProvider } from "./context/context";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <MainContextProvider>
          <Topbar />
          {children}
        </MainContextProvider>
      </body>
    </html>
  );
}
