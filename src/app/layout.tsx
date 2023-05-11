import "tw-elements/dist/css/tw-elements.min.css";
import "./globals.css";

import { Roboto } from "next/font/google";
import { Providers } from "@/redux/provider";

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
    <html lang="en" data-theme="dracula">
      <Providers>
        <body className={roboto.className}>{children}</body>
      </Providers>
    </html>
  );
}
