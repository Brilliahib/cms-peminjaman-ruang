import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import GlobalProvider from "@/components/organisms/GlobalProvider";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/atoms/navbar/Navbar"), {
  ssr: false,
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sistem Informasi Manajemen Ruang",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <GlobalProvider>
          <main className="font-poppins">
            <Navbar />
            {children}
          </main>
          <Toaster />
        </GlobalProvider>
      </body>
    </html>
  );
}
