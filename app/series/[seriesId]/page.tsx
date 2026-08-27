"use client";
import React from "react";
import Link from "next/link";
import { ThickArrowLeftIcon } from "@radix-ui/react-icons";

const Series = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="scanlines relative w-full max-w-lg overflow-hidden rounded-md border-2 border-crt-600 bg-crt-700 p-10 text-center">
        <p className="font-crt text-xl text-magenta">✗ NO SIGNAL</p>
        <h1 className="mt-3 font-display text-3xl uppercase text-cream">
          Tape not cataloged yet
        </h1>
        <p className="mt-3 text-cream/70">
          This series page is still being dubbed. Check back soon — or browse the
          shelves in the meantime.
        </p>
        <Link
          href="/"
          className="sticker mt-6 inline-flex items-center gap-2 rounded-sm bg-phosphor px-4 py-2 font-display text-xs uppercase text-crt-800"
        >
          <ThickArrowLeftIcon /> Back to store
        </Link>
      </div>
    </div>
  );
};

export default Series;
