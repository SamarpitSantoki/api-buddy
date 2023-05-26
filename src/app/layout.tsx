import "./globals.css";
import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

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
    <html lang="en">
      <body className={poppins.className + " min-h-screen"}>
        <Navbar />
        <div className="flex h-full">{children}</div>
      </body>
    </html>
  );
}
