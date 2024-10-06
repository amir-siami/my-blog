import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

import "./globals.css";
import Header from "./_components/header/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Blog App",
    default: "Welcome | Blog App",
  },
  description: "Aplication using Next JS to get Posts from an API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-4 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
