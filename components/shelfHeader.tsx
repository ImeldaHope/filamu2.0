import React from "react";

/* A video-store shelf label: channel eyebrow, chunky title, tracking rule. */
const ShelfHeader = ({
  channel,
  title,
  type,
  accent = "phosphor",
}: {
  channel: string;
  title: string;
  type: "movie" | "series";
  accent?: "phosphor" | "magenta" | "amber";
}) => {
  const accentText =
    accent === "magenta"
      ? "text-magenta"
      : accent === "amber"
        ? "text-amber"
        : "text-phosphor";
  const accentBg =
    accent === "magenta"
      ? "bg-magenta"
      : accent === "amber"
        ? "bg-amber"
        : "bg-phosphor";

  return (
    <div className="mb-4">
      <div className={`flex items-center gap-2 font-crt text-lg ${accentText}`}>
        <span>▶ {channel}</span>
        <span className="text-muted">·</span>
        <span className="text-muted">{type === "movie" ? "MOVIES" : "SERIES"}</span>
      </div>
      <div className="flex items-center gap-4">
        <h2 className="font-display text-2xl uppercase leading-none text-cream lg:text-3xl">
          {title}
        </h2>
        <span className={`h-[3px] flex-1 ${accentBg} opacity-70`} />
      </div>
    </div>
  );
};

export default ShelfHeader;
