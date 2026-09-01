import { cn, initials } from "@/lib/utils";

/* A small fixed set of warm/cool tints so a directory of 35 logos still
   reads as one palette rather than a bag of random colours. */
const palette = [
  "bg-[#efe6df] text-[#7a4a2c]",
  "bg-[#e4ebea] text-[#2f6f73]",
  "bg-[#e8e7e2] text-[#4a463f]",
  "bg-[#ece7ef] text-[#5b4569]",
  "bg-[#e6ecdf] text-[#456037]",
  "bg-[#efe8dc] text-[#7a5c1f]"
];

function tint(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return palette[hash % palette.length];
}

const sizes = {
  xs: "h-6 w-6 rounded-md text-[10px]",
  sm: "h-8 w-8 rounded-md text-[11px]",
  md: "h-10 w-10 rounded-lg text-[12px]",
  lg: "h-14 w-14 rounded-xl text-[15px]"
} as const;

export function Avatar({
  name,
  size = "sm",
  className
}: {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-semibold tracking-wide ring-1 ring-inset ring-black/5",
        sizes[size],
        tint(name),
        className
      )}
    >
      {initials(name)}
    </span>
  );
}
