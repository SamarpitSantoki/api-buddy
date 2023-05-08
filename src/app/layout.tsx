import "tw-elements/dist/css/tw-elements.min.css";
import "./globals.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Api Buddy",
  description: "Manage your APIs with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="emerald">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
