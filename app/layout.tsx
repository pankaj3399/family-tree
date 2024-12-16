import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import type { Metadata } from "next";
import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FamilyTreeCreator",
  description: "FamilyTreeCreator is a family tree management application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="pt-br" suppressHydrationWarning>
        <body className={cn("min-h-screen bg-background", inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Navbar />
{/*               
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}

              {children}
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
    // <ClerkProvider>
    //   <html lang="en">
    //     <body>
          
    //       <SignedOut>
    //         <SignInButton />
    //       </SignedOut>
    //       <SignedIn>
    //         <UserButton />
    //       </SignedIn>
    //       <ClerkLoading>Loading ..</ClerkLoading>
    //       <ClerkLoaded>
    //       {/* <Navbar /> */}
    //       {children}
    //       </ClerkLoaded>
    //     </body>
    //   </html>
    // </ClerkProvider>
  );
}
