import type { AnchorHTMLAttributes } from "react";

type ArrowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  tone?: "ink" | "bone" | "clay";
  size?: "sm" | "md";
};

const TONE = {
  ink: "text-ink",
  bone: "text-bone",
  clay: "text-clay",
} as const;

const ArrowLink = ({ label, tone = "ink", size = "md", className = "", href, ...rest }: ArrowLinkProps) => {
  const external = href?.startsWith("http");

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 ${TONE[tone]} ${
        size === "sm" ? "text-[0.8125rem]" : "text-[0.9375rem]"
      } font-medium ${className}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      {...rest}
    >
      <span className="hairline">{label}</span>
      <svg
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        aria-hidden
        className="translate-y-px transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5"
      >
        <path d="M3 13L13 3M13 3H5.5M13 3v7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
      </svg>
    </a>
  );
};

export default ArrowLink;
