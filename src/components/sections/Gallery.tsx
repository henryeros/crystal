"use client";

import Image from "next/image";
import { GALLERY, VENTURES } from "@/lib/content";
import { WORK } from "@/lib/generated/media";
import Marquee from "@/components/primitives/Marquee";
import SectionLabel from "@/components/primitives/SectionLabel";

const half = Math.ceil(GALLERY.length / 2);
const ROWS = [GALLERY.slice(0, half), GALLERY.slice(half)];

const Plate = ({ itemKey, caption }: { itemKey: keyof typeof WORK; caption: string }) => {
  const asset = WORK[itemKey];
  const portrait = asset.height > asset.width;

  return (
    <figure className="mr-4 shrink-0 sm:mr-5">
      <div
        className={`relative overflow-hidden rounded-xl bg-bone-deep ${
          portrait ? "h-[13rem] w-[10rem] sm:h-[20rem] sm:w-[15rem]" : "h-[13rem] w-[19rem] sm:h-[20rem] sm:w-[29rem]"
        }`}
      >
        <Image
          src={asset.src}
          alt={caption}
          fill
          sizes="(min-width: 640px) 29rem, 19rem"
          quality={72}
          loading="lazy"
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          className="object-cover"
        />
      </div>
      <figcaption className="eyebrow mt-3 text-[0.625rem] text-ink/35">{caption}</figcaption>
    </figure>
  );
};

const Gallery = () => (
  <section className="relative overflow-hidden bg-bone py-[clamp(4rem,10vw,8rem)]">
    <div className="shell">
      <SectionLabel index="06">Field notes</SectionLabel>
      <h2 className="display mt-8 max-w-[18ch] text-[length:var(--text-statement)] balance">
        The detail is where the <span className="italic text-clay">comfort</span> actually lives.
      </h2>
    </div>

    <div className="mt-[clamp(2.5rem,5vw,4rem)] space-y-5">
      {ROWS.map((row, index) => (
        <Marquee key={index} speed={index === 0 ? 68 : 82} reverse={index === 1} pauseOnHover>
          {row.map((item) => (
            <Plate key={item.key} itemKey={item.key} caption={item.caption} />
          ))}
        </Marquee>
      ))}
    </div>

    <div className="shell mt-[clamp(3rem,6vw,4.5rem)]">
      <Marquee speed={46} className="edge-line py-6">
        {VENTURES.map((venture) => (
          <span key={venture.id} className="flex items-center">
            <span className="display px-6 text-[clamp(1.6rem,3vw,2.6rem)] whitespace-nowrap text-ink/70 sm:px-9">
              {venture.name}
            </span>
            <span className="size-1.5 rounded-full bg-clay" />
          </span>
        ))}
      </Marquee>
    </div>
  </section>
);

export default Gallery;
