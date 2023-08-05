import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ToastProvider from "@/providers/ToastProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Minim Admin Dashboard",
  description: "Created by Ye Lin Ko",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`} suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="container mx-auto my-20">{children}</div>
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
