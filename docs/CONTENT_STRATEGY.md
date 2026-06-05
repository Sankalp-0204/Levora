# Content Strategy & Media Optimization

This document outlines the editorial framework, copywriting guidelines, and asset optimization pipelines required to deliver a fast, premium, and narrative-driven luxury user experience.

---

## 1. Brand Narrative Philosophy

Levora does not sell tools to tell time; it sells **wrist-worn canvases of Indian heritage**.
* **The "Canvas" Concept**: Every dial is a layer of historical storytelling (inspired by Indian art, dynasties, and monuments).
* **The Collector's Journey**: The content must invite the user to explore the history first, building an emotional connection to the craftsmanship before presenting purchasing information or pricing.

---

## 2. Copywriting Tone & Guidelines

| Pillar | Tone Standard | What to Avoid | Example |
| :--- | :--- | :--- | :--- |
| **Sophisticated** | Use elegant, descriptive vocabulary; focus on heritage details. | Avoid sales jargon, discounts, or pushy call-to-actions ("Buy now!"). | *"A Tribute to the geometry of the Konark Sun Temple."* |
| **Authoritative** | Speak with deep horological authority about calibres and handcrafting. | Avoid generic specs or claiming simple outsourced assembly. | *"Powered by our proprietary automatic calibre L98 movement."* |
| **Poetic** | Paint a picture of the watch face as a canvas of light and shadows. | Avoid dry listing of parts without emotional context. | *"Laser-cut silver layers capture the changing shadows of twilight."* |

---

## 3. Media Asset Optimization Pipeline

Immersive visual storytelling requires strict file optimization policies to prevent slow page load speeds and low Core Web Vitals.

```mermaid
graph TD
    Source[Raw Asset (Render/Video)] --> Process{Asset Type}
    
    Process -->|High-Res PNG| Sharp[Convert to AVIF / WebP via Next.js Image]
    Process -->|Video Loop| FFmpeg[Compress with FFmpeg: CRF 24, HEVC/H264, No Audio]
    Process -->|3D Watch Model| Draco[Compress with Draco: gltf-transform, <3MB]
    
    Sharp --> CDN[Next.js Public Cache / CDN]
    FFmpeg --> CDN
    Draco --> CDN
```

### A. High-Resolution Static Images
* **Format**: Deliver assets in **AVIF** (preferred) or WebP format.
* **Sizing**: Detail showcase renders must be output at `2048x2048` max pixels. Grid catalog thumbnails must be capped at `800x800` pixels.
* **Next.js Integration**: Always use the Next.js `Image` component. Define custom `sizes` to prevent the browser from downloading desktop-sized images on mobile devices:
  ```typescript
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  ```

### B. Ambient Video Loops
* **Rule**: Video loops must load instantly, run silently, and loop continuously without layout jumps.
* **Technical Constraints**:
  * File size must be strictly **under 5MB**.
  * Formats: Provide both WebM (VP9) and MP4 (H.264/HEVC) containers for cross-browser support.
  * Audio track must be stripped during compression to allow modern browsers to auto-play:
    ```bash
    ffmpeg -i input.mp4 -an -vcodec libx264 -crf 24 -profile:v baseline output.mp4
    ```

### C. 3D Model Optimization
* **Format**: Use **GLB** (binary glTF format).
* **Draco Compression**: Models must be compressed using Draco geometry compression.
* **Texture Baking**: Bake lighting and shadows directly into the textures (ambient occlusion maps) to keep real-time shader calculations simple for mobile GPUs.
* **Model Size**: The total GLB model file size must not exceed **3.5MB**. Use toolkits like `gltf-pipeline` or Blender file exports to prune unused mesh details.
