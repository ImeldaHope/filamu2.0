import type { Metadata } from "next";
import Link from "next/link";
import { ThickArrowLeftIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "404 · No Signal · Filamu",
  description: "This tape isn't on our shelves.",
};

const BARS = [
  "#EDE9DE",
  "#FFB020",
  "#2FE6C4",
  "#3FB56B",
  "#FF4FA3",
  "#E5484D",
  "#4F86FF",
];

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4 md:p-6">
      <div className="scanlines grain relative w-full max-w-2xl overflow-hidden rounded-md border-2 border-crt-600 bg-crt-800">
        {/* Broadcast test-card bars */}
        <div className="flex h-20 md:h-28">
          {BARS.map((c, i) => (
            <div key={i} className="h-full flex-1" style={{ backgroundColor: c, opacity: 0.82 }} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="flex items-center gap-2 font-crt text-lg text-magenta">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-magenta" />
            NO SIGNAL · CH 404
          </span>
          <span className="channel-number select-none text-10xl leading-none md:text-12xl">
            404
          </span>
          <h1 className="font-display text-2xl uppercase text-cream md:text-3xl">
            This tape isn&apos;t on our shelves
          </h1>
          <p className="max-w-md font-crt text-lg text-muted">
            The page you rewound to is either checked out, mislabeled, or never
            existed. Adjust your tracking and head back to the store.
          </p>
          <Link
            href="/"
            className="sticker mt-2 inline-flex items-center gap-2 rounded-sm bg-phosphor px-4 py-2 font-display text-xs uppercase text-crt-800 transition-transform hover:-translate-y-0.5"
          >
            <ThickArrowLeftIcon /> Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}
