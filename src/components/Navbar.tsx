'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import { TypographyH1, TypographyH3 } from "./ui/typography";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center gap-16 p-4 ">
      <div className="text-center w-44">
        <TypographyH3>Api Buddy</TypographyH3>
      </div>

      <Link
        href="/projects"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Projects
      </Link>
    </nav>
  );
} 