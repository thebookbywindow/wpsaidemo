"""Crop 7 trust logos (skip UNESCO) from home-trust-bar.png.

Source is near-black logos (max ~16) on black. We amplify, crop by
manual x-bounds tuned against the inverted debug strip, then emit
transparent slate PNGs for the light homepage.

Run: python scripts/split-trust-logos.py
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "home-trust-bar.png"
OUT_DIR = ROOT / "public" / "images" / "trust-logos"

# Tuned against inverted/boosted strip (1024x79). Skip UNESCO on the left.
LOGOS = [
    ("ficci", 68, 175, "FICCI"),
    ("app-store", 175, 340, "App Store"),
    ("google-play", 340, 500, "Google Play"),
    ("cnet", 500, 600, "CNET"),
    ("trustpilot", 600, 760, "Trustpilot"),
    ("techradar", 760, 900, "TechRadar"),
    ("forbes", 900, 1024, "Forbes"),
]

TRUST_GRAY = (100, 116, 139)
TARGET_H = 40


def amplify_to_rgba(img: Image.Image) -> Image.Image:
    """Turn faint gray-on-black into opaque slate on transparent."""
    arr = np.array(img.convert("RGB"), dtype=np.float32)
    lum = arr.max(axis=2)
    # Amplify: max source ~16 → stretch toward 255
    strength = np.clip(lum * (255.0 / 16.0), 0, 255)
    alpha = np.where(lum >= 1.5, np.clip(strength * 1.15, 80, 255), 0).astype(np.uint8)
    rgba = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
    rgba[..., 0] = TRUST_GRAY[0]
    rgba[..., 1] = TRUST_GRAY[1]
    rgba[..., 2] = TRUST_GRAY[2]
    rgba[..., 3] = alpha
    return Image.fromarray(rgba, "RGBA")


def process_crop(crop: Image.Image) -> Image.Image:
    rgba = amplify_to_rgba(crop)
    bbox = rgba.getbbox()
    if bbox:
        # pad a little so edges aren't clipped
        l, t, r, b = bbox
        pad = 2
        rgba = rgba.crop(
            (
                max(0, l - pad),
                max(0, t - pad),
                min(rgba.width, r + pad),
                min(rgba.height, b + pad),
            )
        )
    if rgba.height < 1:
        return rgba
    tw = max(1, int(rgba.width * (TARGET_H / rgba.height)))
    return rgba.resize((tw, TARGET_H), Image.Resampling.LANCZOS)


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    img = Image.open(SRC)
    w, h = img.size
    for slug, x0, x1, label in LOGOS:
        crop = img.crop((max(0, x0), 0, min(w, x1), h))
        processed = process_crop(crop)
        out = OUT_DIR / f"{slug}.png"
        processed.save(out)
        print(f"wrote {label} -> {out.relative_to(ROOT)} ({processed.size[0]}x{processed.size[1]})")
    print(f"\nDone — {len(LOGOS)} logos in public/images/trust-logos/")


if __name__ == "__main__":
    main()
