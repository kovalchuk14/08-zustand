import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
variable: '--font-roboto',
});


export const metadata: Metadata = {
  title: "Notes App",
  description: "using|creating notes app",
  openGraph: {
    title: "Notes App",
    description: "app for notes created by next.js",
    url: "?",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notes picture"
      },
    ]
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          { modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
