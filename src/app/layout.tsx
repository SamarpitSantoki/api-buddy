import Navbar from "@/components/Navbar";
import "./globals.css";
import { Poppins } from "next/font/google";

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
      <body className={poppins.className + " min-h-screen flex flex-col"}>
        <Navbar />
        <div className="flex bg-red-400 h-max grow">{children}</div>
      </body>
    </html>
  );
}
