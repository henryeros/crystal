import Image from "next/image";
import { BRAND, type BrandKey } from "@/lib/generated/media";

type WordmarkProps = {
  variant: BrandKey;
  alt?: string;
  className?: string;
  height: number;
  priority?: boolean;
  fluid?: boolean;
};

const Wordmark = ({
  variant,
  alt = "Crystal Kizor",
  className = "",
  height,
  priority = false,
  fluid = false,
}: WordmarkProps) => {
  const asset = BRAND[variant];
  const width = Math.round((asset.width / asset.height) * height);

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={fluid ? { width: "100%", height: "auto" } : { height, width: "auto" }}
      unoptimized
    />
  );
};

export default Wordmark;
