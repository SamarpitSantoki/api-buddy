"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { TypographyH1, TypographyH3 } from "./ui/typography";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-between gap-16 p-4 ">
      <div className="flex items-center gap-8">
        <Link href="/">
          <div className="text-center w-44">
            <TypographyH3>Api Buddy</TypographyH3>
          </div>
        </Link>
        <Link
          href="/workspaces"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Workspaces
        </Link>
      </div>

      {pathname.includes("/workspaces/") ? (
        <div>
          Press <kbd>Ctrl</kbd> + <kbd>Space</kbd> to open the command palette
        </div>
      ) : null}

      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </SignedOut>
    </nav>
  );
}
