import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../globals.css";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  if (!session.user) redirect('/sign-up')
  return (
    <html lang="en" >
      <body
        className=" mx-auto w-full "
      >
        <SessionProvider value={session}>
          <Navbar />
          <div className="min-h-screen w-full">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
