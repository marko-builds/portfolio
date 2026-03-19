import { useEffect, useRef, useState } from "react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const P = [
  "transparent", // 0  outside
  "#7B5B3A",     // 1  fur base (warm brown)
  "#9A7450",     // 2  fur highlight
  "#5A3D22",     // 3  fur shadow
  "#3A2510",     // 4  fur darkest (eye area, deep shadow)
  "#C49660",     // 5  fur light (cheeks, forehead)
  "#1793D1",     // 6  Arch blue
  "#0E5F8A",     // 7  Arch blue dark
  "#2BB5F0",     // 8  Arch blue highlight
  "#0D0D1A",     // 9  pupil
  "#00FFC8",     // 10 brand accent (eye highlight + shirt)
  "#00CCA0",     // 11 brand accent shadow
  "#008868",     // 12 brand accent deep
  "#1A1A1A",     // 13 nostril / mouth
  "#B07848",     // 14 inner ear / nose highlight
  "#dde8ff",     // 15 eye white
];

// ─── SPRITE: 18 wide × 20 tall ───────────────────────────────────────────────
// Capybara — grumpy "in the zone" dev face, Arch Linux hat, brand accent shirt

const BASE = [
  // row  0 — hat top
  [ 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0],
  // row  1 — hat body
  [ 0, 0, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 0, 0],
  // row  2 — hat body + arch chevron peak
  [ 0, 0, 7, 6, 6, 6, 6, 6, 8, 8, 6, 6, 6, 6, 6, 7, 0, 0],
  // row  3 — hat lower + arch chevron legs
  [ 0, 0, 7, 7, 6, 6, 6, 8, 7, 7, 8, 6, 6, 6, 7, 7, 0, 0],
  // row  4 — hat brim (wide)
  [ 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0],
  // row  5 — ears + forehead fur
  [ 0, 1, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 1, 0],
  // row  6 — ear inner + upper face
  [ 0, 3,14, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1,14, 3, 0],
  // row  7 — brow: furrowed, angled inward (grumpy "in flow" look)
  [ 0, 0, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 0, 0],
  // row  8 — eyes: wide-set, deadpan, with highlight
  [ 0, 0, 1, 4, 9, 9,15, 4, 1, 1, 4,15, 9, 9, 4, 1, 0, 0],
  // row  9 — eye lower + brand accent highlight (the green glint)
  [ 0, 0, 1, 4, 9,10, 4, 4, 1, 1, 4, 4,10, 9, 4, 1, 0, 0],
  // row 10 — under-eye / cheek
  [ 0, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0],
  // row 11 — wide flat snout (capybara signature)
  [ 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
  // row 12 — snout wide, nostrils
  [ 0, 0, 0, 2, 2,14,14, 2, 2, 2, 2,14,14, 2, 2, 0, 0, 0],
  // row 13 — lower snout + frown line (grumpy mouth)
  [ 0, 0, 0, 1, 2, 2, 2, 2,13,13, 2, 2, 2, 2, 1, 0, 0, 0],
  // row 14 — jowls (wide capybara jowls)
  [ 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
  // row 15 — chin / lower jaw
  [ 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0],
  // row 16 — neck / collar
  [ 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0],
  // row 17 — collar accent
  [ 0, 0, 0,10,11, 1, 1, 1, 1, 1, 1, 1,11,10, 0, 0, 0, 0],
  // row 18 — shirt shoulders
  [ 0, 0,10,11,12,10,10,10,10,10,10,10,12,11,10, 0, 0, 0],
  // row 19 — shirt (clipped by circle bottom)
  [ 0,10,11,10,10,10,10,10,10,10,10,10,10,10,11,10, 0, 0],
];

// ── Blink frames ──────────────────────────────────────────────────────────────
const BLINK1 = BASE.map((r, i) => {
  if (i === 8) return [0,0,1,4,9,9,4,4,1,1,4,4,9,9,4,1,0,0];
  if (i === 9) return [0,0,1,4,4,4,4,4,1,1,4,4,4,4,4,1,0,0];
  return r;
});
const BLINK2 = BASE.map((r, i) => {
  if (i === 8) return [0,0,1,4,4,4,4,4,1,1,4,4,4,4,4,1,0,0];
  if (i === 9) return [0,0,1,4,3,3,4,4,1,1,4,4,3,3,4,1,0,0];
  return r;
});

// ── Hover: grumpy → grudging acknowledgment (brows ease, mouth neutral) ──────
const HOVER = BASE.map((r, i) => {
  // brows ease slightly (less furrowed)
  if (i === 7) return [0,0,1,1,1,3,1,1,1,1,1,1,3,1,1,1,0,0];
  // mouth: neutral instead of frown
  if (i === 13) return [0,0,0,1,2,2,2,2,2,13,13,2,2,2,1,0,0,0];
  return r;
});

// ── Bob: subtle breathing ───────────────────────────────────────────────────
const BOB = [
  ...BASE.slice(0, 4),
  ...BASE.slice(5, 16),
  BASE[15],
  ...BASE.slice(16),
];

const SEQ = [
  { frame: BASE,   dur: 3000 },
  { frame: BLINK1, dur: 60   },
  { frame: BLINK2, dur: 80   },
  { frame: BLINK1, dur: 60   },
  { frame: BASE,   dur: 600  },
  { frame: BOB,    dur: 500  },
  { frame: BASE,   dur: 500  },
  { frame: BOB,    dur: 500  },
  { frame: BASE,   dur: 1400 },
  { frame: BLINK1, dur: 60   },
  { frame: BLINK2, dur: 80   },
  { frame: BLINK1, dur: 60   },
  { frame: BASE,   dur: 3400 },
];

const PS  = 8;       // px per sprite-pixel → 144×160 canvas
const W   = 18;
const H   = 20;
const CIRCLE = 160;

function drawFrame(ctx, grid) {
  ctx.clearRect(0, 0, W * PS, H * PS);
  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      const idx = grid[r][c];
      if (!idx) continue;
      ctx.fillStyle = P[idx];
      ctx.fillRect(c * PS, r * PS, PS, PS);
    }
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CapybaraAvatar() {
  const canvasRef = useRef(null);
  const seqRef    = useRef(0);
  const timerRef  = useRef(null);

  const [hover,   setHover]   = useState(false);
  const [booted,  setBooted]  = useState(false);
  const [scanRow, setScanRow] = useState(0);

  // ── Scan reveal ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let row = 0;
    const iv = setInterval(() => {
      row++;
      setScanRow(row);
      if (row >= H) { clearInterval(iv); setTimeout(() => setBooted(true), 180); }
    }, 28);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (booted) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, W * PS, H * PS);
    for (let r = 0; r < Math.min(scanRow, H); r++) {
      for (let c = 0; c < W; c++) {
        const idx = BASE[r][c];
        if (!idx) continue;
        ctx.fillStyle = P[idx];
        ctx.fillRect(c * PS, r * PS, PS, PS);
      }
    }
    if (scanRow < H) {
      ctx.fillStyle = "rgba(0,255,200,0.5)";
      ctx.fillRect(0, scanRow * PS, W * PS, 2);
    }
  }, [scanRow, booted]);

  // ── Animation loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!booted) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    function tick() {
      const { frame, dur } = SEQ[seqRef.current];
      drawFrame(ctx, hover ? HOVER : frame);
      seqRef.current = (seqRef.current + 1) % SEQ.length;
      timerRef.current = setTimeout(tick, dur);
    }
    tick();
    return () => clearTimeout(timerRef.current);
  }, [booted, hover]);

  const canvasW = W * PS;
  const canvasH = H * PS;
  const scale = CIRCLE / Math.max(canvasW, canvasH);
  const scaledW = canvasW * scale;
  const scaledH = canvasH * scale;
  const offsetX = (CIRCLE - scaledW) / 2;
  const offsetY = (CIRCLE - scaledH) / 2 - 4;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        animation: booted ? "capy-bob 4.5s ease-in-out infinite" : "none",
      }}
    >
      <style>{`
        @keyframes capy-bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes capy-pulse  { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes capy-ring   {
          0%,100% { box-shadow: 0 0 0 2px rgba(0,255,200,0.35), 0 0 14px rgba(0,255,200,0.15); }
          50%     { box-shadow: 0 0 0 2px rgba(0,255,200,0.6),  0 0 22px rgba(0,255,200,0.28); }
        }
        @keyframes capy-ringH  {
          0%,100% { box-shadow: 0 0 0 2px rgba(0,255,200,0.9), 0 0 32px rgba(0,255,200,0.4); }
          50%     { box-shadow: 0 0 0 3px #00FFC8,             0 0 48px rgba(0,255,200,0.6); }
        }
        @keyframes capy-scan  { 0%{top:-30%} 100%{top:130%} }
        @keyframes capy-flick { 0%,100%{opacity:1} 95%{opacity:0.94} 97%{opacity:0.88} 99%{opacity:0.94} }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        inset: "-20px",
        borderRadius: "50%",
        background: hover
          ? "radial-gradient(ellipse, rgba(0,255,200,0.2) 0%, transparent 65%)"
          : "radial-gradient(ellipse, rgba(0,255,200,0.07) 0%, transparent 65%)",
        transition: "background 0.5s",
        pointerEvents: "none",
      }} />

      {/* Circle container */}
      <div style={{
        width: CIRCLE,
        height: CIRCLE,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        background: "#0D0D0D",
        animation: hover ? "capy-ringH 1.6s ease-in-out infinite" : "capy-ring 3.5s ease-in-out infinite",
        flexShrink: 0,
      }}>
        {/* Boot / scan state */}
        {!booted && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 8, background: "#0D0D0D",
          }}>
            <div style={{ width: 60, height: 2, background: "#111", border: "1px solid rgba(0,255,200,0.13)" }}>
              <div style={{
                height: "100%",
                background: "linear-gradient(90deg,#00CCA0,#00FFC8)",
                width: `${Math.min((scanRow / H) * 100, 100)}%`,
                transition: "width 0.03s",
              }}/>
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={canvasW}
          height={canvasH}
          style={{
            display: booted ? "block" : "none",
            imageRendering: "pixelated",
            position: "absolute",
            width: scaledW,
            height: scaledH,
            left: offsetX,
            top: offsetY,
            transform: hover ? "scale(1.04)" : "scale(1)",
            transformOrigin: "center center",
            transition: "transform 0.3s ease",
            animation: "capy-flick 10s infinite",
          }}
        />

        {/* Scanlines */}
        {booted && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(0,0,0,0.12) 6px)",
            pointerEvents: "none",
          }} />
        )}

        {/* Moving scan sweep */}
        {booted && (
          <div style={{
            position: "absolute", left: 0, right: 0,
            height: "25%",
            background: "linear-gradient(transparent,rgba(0,255,200,0.028) 50%,transparent)",
            animation: "capy-scan 5s linear infinite",
            pointerEvents: "none",
          }} />
        )}

        {/* Inner vignette */}
        {booted && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {/* Online indicator */}
      {booted && (
        <div style={{
          position: "absolute",
          bottom: 6, right: 6,
          width: 12, height: 12,
          borderRadius: "50%",
          background: "#00FFC8",
          border: "2px solid #0D0D0D",
          boxShadow: "0 0 8px rgba(0,255,200,0.8)",
          animation: "capy-pulse 2.8s ease-in-out infinite",
        }} />
      )}
    </div>
  );
}
