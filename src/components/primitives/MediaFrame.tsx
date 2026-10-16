"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MediaAsset } from "@/lib/generated/media";

type MediaFrameProps = {
  asset: MediaAsset;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  parallax?: number;
  quality?: number;
};

const MediaFrame = ({
  asset,
  alt,
  sizes,
  className = "",
  imageClassName = "",
  priority = false,
  parallax = 8,
  quality = 82,
}: MediaFrameProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-bone-deep ${className}`}>
      <motion.div
        className="absolute -inset-x-0 -top-[14%] h-[128%] w-full will-change-transform"
        style={parallax ? { y } : undefined}
      >
        <Image
          src={asset.src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          placeholder={asset.blurDataURL ? "blur" : "empty"}
          blurDataURL={asset.blurDataURL}
          className={`object-cover ${imageClassName}`}
        />
      </motion.div>
    </div>
  );
};

export default MediaFrame;
