import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import { Toaster } from "react-hot-toast";
import { VisualEditsMessenger } from "orchids-visual-edits";
import AuthBootstrapper from "@/components/AuthBootstrapper";
import CartPersistence from "@/components/CartPersistence";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LuxeRent | Premium Rental Marketplace",
  description: "Rent premium products from verified sellers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          {/* Rehydrate auth from secure cookie on app load so login survives refresh */}
          <AuthBootstrapper />
          {/* Keep carts scoped per-identity and persisted across reloads */}
          <CartPersistence />
          {children}
          <Toaster position="top-center" />
        </ReduxProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
