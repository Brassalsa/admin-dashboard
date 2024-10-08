import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ContextProvider from "@/components/context";
import SideBar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "People.co",
  description: "Dashboard page made with next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <Header />
          <main className="px-2 lg:flex gap-2">
            <SideBar />
            {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
