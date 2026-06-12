import React from "react";
import Image from "next/image";
import { HeritageMotion } from "./HeritageMotion";

/**
 * @file components/story/MediaLayer.tsx
 * @description An asset-agnostic media component that renders SVG, Video, or Imagery.
 * Designed to allow seamless upgrading of placeholders to high-res assets in the future.
 */

export type MediaType = "video" | "image" | "svg" | "heritage-motion";

export interface MediaAsset {
  type: MediaType;
  src?: string; // URL for video/image
  poster?: string; // Poster for video
  svgContent?: string; // Raw SVG string for placeholder
  motionType?: "warli" | "pattachitra" | "chand_baori" | "bidriware"; // For HeritageMotion
  alt: string;
}

interface MediaLayerProps {
  asset: MediaAsset;
  className?: string;
  priority?: boolean;
}

export function MediaLayer({ asset, className = "", priority = false }: MediaLayerProps) {
  if (asset.type === "video" && asset.src) {
    return (
      <video
        className={`w-full h-full object-cover ${className}`}
        src={asset.src}
        poster={asset.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={asset.alt}
      />
    );
  }

  if (asset.type === "image" && asset.src) {
    return (
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
      />
    );
  }

  if (asset.type === "svg" && asset.svgContent) {
    return (
      <div
        className={`w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover ${className}`}
        dangerouslySetInnerHTML={{ __html: asset.svgContent }}
        aria-label={asset.alt}
        role="img"
      />
    );
  }

  if (asset.type === "heritage-motion" && asset.motionType) {
    return (
      <HeritageMotion 
        type={asset.motionType} 
        className={`w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover ${className}`} 
      />
    );
  }

  // Fallback if asset is malformed
  return (
    <div 
      className={`w-full h-full bg-black border border-white/5 flex items-center justify-center ${className}`}
      aria-label={asset.alt}
    >
      <span className="type-caption text-ink-400 uppercase tracking-widest">Media Missing</span>
    </div>
  );
}
