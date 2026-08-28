import Image from "next/image";

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

const PersonAvatar = ({
  name,
  path,
  className,
  shape = "circle",
  textClass = "text-3xl",
  sizes = "160px",
}: {
  name: string;
  path: string | null;
  className: string;
  shape?: "circle" | "square";
  textClass?: string;
  sizes?: string;
}) => {
  const rounded = shape === "circle" ? "rounded-full" : "rounded-sm";
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border-2 border-crt-600 bg-crt-800 ${rounded} ${className}`}
    >
      {path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${path}`}
          alt={name}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <span className={`font-display text-muted ${textClass}`}>
          {initialsOf(name)}
        </span>
      )}
    </div>
  );
};

export default PersonAvatar;
