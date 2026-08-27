"use client";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

/* On-screen-display clock, like the timecode burned into a home recording. */
const OsdClock = () => {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-crt text-lg leading-none text-phosphor text-glow tabular-nums">
      {now ?? "--:--:--"}
    </span>
  );
};

const links = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/series", label: "Series" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-phosphor/60 bg-crt-800/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        {/* Brand — a tape spine */}
        <div className="flex items-baseline gap-2">
          <Link
            href="/"
            className="font-display text-2xl tracking-tight text-cream"
            aria-label="Filamu home"
          >
            FILAMU
          </Link>
          <span className="sticker rounded-sm px-1.5 py-1 text-[10px] text-magenta">
            VHS
          </span>
          <a
            href="https://ihope.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-crt text-base text-muted hover:text-phosphor sm:inline"
          >
            by ihope.dev
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <span className="hidden items-center gap-2 lg:flex">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-magenta shadow-[0_0_8px_#FF4FA3]" />
            <span className="font-crt text-base text-magenta">REC</span>
            <OsdClock />
          </span>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-crt text-lg uppercase tracking-wide text-cream transition-colors hover:text-phosphor hover:text-glow"
            >
              {l.label}
            </Link>
          ))}
          <SignedOut>
            <SignInButton>
              <button className="sticker rounded-sm bg-phosphor px-3 py-1.5 text-sm text-crt-800 transition-transform hover:-translate-y-0.5">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-phosphor md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <Cross1Icon className="h-6 w-6" />
          ) : (
            <HamburgerMenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-crt-600 bg-crt-800 transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-crt text-xl uppercase tracking-wide text-cream hover:text-phosphor"
              onClick={() => setIsOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-1">
            <SignedOut>
              <SignInButton>
                <button className="sticker rounded-sm bg-phosphor px-3 py-1.5 text-sm text-crt-800">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
