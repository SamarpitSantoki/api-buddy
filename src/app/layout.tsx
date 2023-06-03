import Navbar from "@/components/Navbar";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "@/redux/providers";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({ weight: ["500"], subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en">
        <Providers>
          <body className={poppins.className + " min-h-screen flex flex-col"}>
            <Navbar />
            <div className="flex grow">{children}</div>
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
