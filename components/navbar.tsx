"use client";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div>
          <Link href="/" className="text-2xl font-bold">
            FILAMU by{" "}
          </Link>
          <a
            href="https://ihope.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            ihope.dev
          </a>
        </div>

        <div className="hidden space-x-6 md:flex">
          <Link href="/" className="hover:text-informational">
            Home
          </Link>
          <Link href="/movies" className="hover:text-informational">
            Movies
          </Link>
          <Link href="/series" className="hover:text-informational">
            Series
          </Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <Cross1Icon className="h-6 w-6" />
          ) : (
            <HamburgerMenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-secondary`}
      >
        <div className="flex flex-col space-y-4 p-4">
          <Link
            href="/"
            className="hover:text-informational"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="hover:text-informational"
            onClick={() => setIsOpen(false)}
          >
            Movies
          </Link>
          <Link
            href="/series"
            className="hover:text-informational"
            onClick={() => setIsOpen(false)}
          >
            Series
          </Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
