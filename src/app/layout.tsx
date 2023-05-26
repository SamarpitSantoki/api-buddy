import Navbar from '@/components/navbar'
import './globals.css'
import {  Poppins } from 'next/font/google'



const poppins = Poppins({ weight: ['500'], subsets: ['latin'] })

export const metadata = {
  title: 'Api Buddy',
  description: 'Manage your APIs with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme={'light'}
      className={poppins.className}
    >
      <Navbar />
      <body >{children}</body>
    </html>
  )
}
