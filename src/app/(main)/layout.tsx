import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../globals.css";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/components/SessionProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarLeft from "@/components/sidebar/SidebarLeft";
import SidebarRight from "@/components/sidebar/SidebarRight";

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
        className="w-full max-h-[100vh] overflow-hidden "
      >
        <SessionProvider value={session}>
          {/* <Navbar /> */}
          {/* <Separator orientation="horizontal" /> */}
          <SidebarProvider>
      <SidebarLeft />
      <main className="flex justify-center w-full">
        {children}
      </main>
      <SidebarRight/>
    </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
