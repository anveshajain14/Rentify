import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import { Toaster } from "react-hot-toast";
import { VisualEditsMessenger } from "orchids-visual-edits";
import AuthBootstrapper from "@/components/AuthBootstrapper";
import CartPersistence from "@/components/CartPersistence";
import ThemeScript from "@/components/ThemeScript";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeScript />
        <ReduxProvider>
          {/* Rehydrate auth from secure cookie on app load so login survives refresh */}
          <AuthBootstrapper />
          {/* Keep carts scoped per-identity and persisted across reloads */}
          <CartPersistence />
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              className: '',
              style: {},
              success: { iconTheme: { primary: '#22c55e' } },
              error: { iconTheme: { primary: '#ef4444' } },
            }}
          />
        </ReduxProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
