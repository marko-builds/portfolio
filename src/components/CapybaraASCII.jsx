import { useEffect, useRef, useState } from "react";

// ─── ASCII FRAMES ─────────────────────────────────────────────────────────────
// Designed to sit inside a circle crop — wide capybara face, arch hat on top
// 22 chars wide × 16 rows tall

const IDLE = [
  "     _________     ",
  "   /  /_____/  \\   ",
  "  |  |  >_  |  |  ",
  "   \\__|_____|__/   ",
  "  (  '         '  )",
  " ( >.<       >.<  )",
  "(    \\_______/    )",
  "(   ____|____     )",
  "(  |  ===  |      )",
  " (    ___    )     ",
  "  (  (   )  )     ",
  "   (__(___)__)     ",
  "     |   |         ",
  "   __|___|__       ",
  "  /  {   }  \\     ",
  " /___________\\    ",
];

// Blink — eyes change from >. to -- 
const BLINK1 = IDLE.map((r, i) => {
  if (i === 5) return " ( -.-       -.-  )";
  return r;
});
const BLINK2 = IDLE.map((r, i) => {
  if (i === 5) return " ( ---       ---  )";
  return r;
});

// Hover — grumpy brows relax, mouth corner ticks up (smirk)
const HOVER = IDLE.map((r, i) => {
  if (i === 5) return " ( ^.^       ^.^  )";
  if (i === 8) return "(   |  ===  |,    )";
  return r;
});

const SEQ = [
  { frame: IDLE,   dur: 3000 },
  { frame: BLINK1, dur: 65   },
  { frame: BLINK2, dur: 85   },
  { frame: BLINK1, dur: 65   },
  { frame: IDLE,   dur: 700  },
  { frame: IDLE,   dur: 2800 },
  { frame: BLINK1, dur: 65   },
  { frame: BLINK2, dur: 85   },
  { frame: BLINK1, dur: 65   },
  { frame: IDLE,   dur: 3500 },
];

// ─── Char coloring ────────────────────────────────────────────────────────────
function charColor(ch, rowIdx, isHover) {
  // Hat rows 0-3
  if (rowIdx <= 3) {
    if (">_".includes(ch))  return "#00ff9f";   // arch logo
    if ("/\\|_".includes(ch)) return "#302e48";
    if (ch === "-")         return "#252338";
    return "#1e1c30";
  }
  // Eyes
  if (">.<^".includes(ch) && rowIdx === 5) return isHover ? "#00ff9f" : "#a0ffd0";
  if ("-".includes(ch)    && rowIdx === 5) return "#5a8a70";
  // Brand green shirt rows 13-15
  if (rowIdx >= 13) {
    if ("{}".includes(ch)) return "#00ff9f";
    if ("/\\".includes(ch)) return "#00cc7a";
    if ("_".includes(ch))  return "#008850";
    return "#00aa66";
  }
  // Face / body
  if ("()".includes(ch))   return "#7a5230";
  if ("_".includes(ch))    return "#5a3a1a";
  if ("|".includes(ch))    return "#6a4828";
  if ("/\\".includes(ch))  return "#8a6240";
  if ("=".includes(ch))    return "#9a6d42";
  if ("'`".includes(ch))   return "#c8945a";
  return "#7a5a38";
}

// ─── Boot lines ───────────────────────────────────────────────────────────────
const BOOT = [
  { text: "$ init capy.avatar",   delay: 0    },
  { text: "> fur: warm.brown",    delay: 300  },
  { text: "> hat: arch.linux",    delay: 580  },
  { text: "> mood: grumpy.exe",   delay: 860  },
  { text: "> accent: #00ff9f",    delay: 1140 },
  { text: "✓ ready.",             delay: 1500 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CapybaraASCII() {
  const seqRef   = useRef(0);
  const timerRef = useRef(null);

  const [frame,      setFrame]      = useState(IDLE);
  const [hover,      setHover]      = useState(false);
  const [booted,     setBooted]     = useState(false);
  const [bootLines,  setBootLines]  = useState([]);
  const [showAvatar, setShowAvatar] = useState(false);

  // ── Boot sequence ──────────────────────────────────────────────────────────
  useEffect(() => {
    const timers = BOOT.map(({ text, delay }, i) =>
      setTimeout(() => {
        setBootLines(prev => [...prev, text]);
        if (i === BOOT.length - 1) {
          setTimeout(() => {
            setBooted(true);
            setTimeout(() => setShowAvatar(true), 100);
          }, 400);
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Animation loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!booted) return;
    function tick() {
      const { frame: f, dur } = SEQ[seqRef.current];
      setFrame(hover ? HOVER : f);
      seqRef.current = (seqRef.current + 1) % SEQ.length;
      timerRef.current = setTimeout(tick, dur);
    }
    tick();
    return () => clearTimeout(timerRef.current);
  }, [booted, hover]);

  // ── Render a single ASCII line with per-char coloring ─────────────────────
  const renderLine = (line, rowIdx, isHover) => (
    <div key={rowIdx} style={{ whiteSpace: "pre", lineHeight: "1.35" }}>
      {line.split("").map((ch, ci) => (
        <span key={ci} style={{
          color: ch === " " ? "transparent" : charColor(ch, rowIdx, isHover),
          fontWeight: ">_{}=".includes(ch) ? 600 : 400,
        }}>
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07070f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600&display=swap');
        @keyframes bob      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.18} }
        @keyframes fadeIn   { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes flicker  { 0%,100%{opacity:1} 94%{opacity:0.96} 97%{opacity:0.88} 99%{opacity:0.96} }
        @keyframes ringIdle {
          0%,100% { box-shadow: 0 0 0 1px rgba(0,255,159,0.3), 0 0 14px rgba(0,255,159,0.12); }
          50%     { box-shadow: 0 0 0 2px rgba(0,255,159,0.55), 0 0 22px rgba(0,255,159,0.25); }
        }
        @keyframes ringHover {
          0%,100% { box-shadow: 0 0 0 2px rgba(0,255,159,0.9), 0 0 30px rgba(0,255,159,0.4); }
          50%     { box-shadow: 0 0 0 2px #00ff9f,             0 0 44px rgba(0,255,159,0.6); }
        }
        @keyframes scanline { 0%{top:-30%} 100%{top:130%} }
        @keyframes termBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <div style={{ display: "flex", gap: 36, alignItems: "flex-start", justifyContent: "center" }}>

        {/* ── Terminal boot panel ─────────────────────────────────────── */}
        <div style={{
          width: 200,
          paddingTop: 6,
          opacity: bootLines.length > 0 ? 1 : 0,
          transition: "opacity 0.4s",
        }}>
          {/* Terminal chrome */}
          <div style={{
            border: "1px solid #00ff9f18",
            background: "#080810",
            animation: "flicker 10s infinite",
          }}>
            <div style={{
              padding: "6px 10px",
              borderBottom: "1px solid #00ff9f14",
              background: "#0a0a14",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              {["#ff2d78","#ffcc00","#00ff9f"].map((c, i) => (
                <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
              <span style={{ color: "#00ff9f33", fontSize: 8, letterSpacing: "0.15em", marginLeft: 6 }}>
                capy.sh
              </span>
            </div>
            <div style={{ padding: "12px 14px", minHeight: 130 }}>
              {bootLines.map((line, i) => (
                <div key={i} style={{
                  fontSize: 10,
                  lineHeight: "1.8",
                  color: line.startsWith("$") ? "#ff2d78"
                       : line.startsWith("✓") ? "#00ff9f"
                       : line.includes("#00ff9f") ? "#00ff9f"
                       : "#00ff9f66",
                  whiteSpace: "pre",
                  animation: "fadeUp 0.25s ease both",
                }}>
                  {line}
                </div>
              ))}
              {!booted && (
                <span style={{
                  color: "#00ff9f",
                  fontSize: 10,
                  animation: "termBlink 0.7s step-end infinite",
                }}>▋</span>
              )}
              {booted && (
                <div style={{ color: "#ff2d78", fontSize: 10, marginTop: 2, animation: "fadeUp 0.3s ease both" }}>
                  $ <span style={{ color: "#00ff9f66" }}>
                    {hover ? "capy.smirk()" : "capy.idle()"}
                  </span>
                  <span style={{ animation: "termBlink 0.7s step-end infinite", color: "#00ff9f" }}>▋</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Avatar ─────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center" }}>
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              display: "inline-block",
              position: "relative",
              cursor: "text",
              animation: booted ? "bob 4.5s ease-in-out infinite" : "none",
              opacity: showAvatar ? 1 : 0,
              transform: showAvatar ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s, transform 0.5s",
            }}
          >
            {/* Ambient glow */}
            <div style={{
              position: "absolute", inset: "-20px", borderRadius: "50%", pointerEvents: "none",
              background: hover
                ? "radial-gradient(ellipse, rgba(0,255,159,0.18) 0%, transparent 65%)"
                : "radial-gradient(ellipse, rgba(0,255,159,0.06) 0%, transparent 65%)",
              transition: "background 0.5s",
            }} />

            {/* ASCII frame — border + scanlines */}
            <div style={{
              position: "relative",
              padding: "10px 14px",
              border: `1px solid rgba(0,255,159,${hover ? 0.45 : 0.16})`,
              background: "#07070f",
              transition: "border 0.3s",
              animation: "flicker 11s infinite, " + (hover ? "ringHover 1.8s ease-in-out infinite" : "ringIdle 3.5s ease-in-out infinite"),
              overflow: "hidden",
              fontSize: "11.5px",
            }}>
              {/* Scanlines */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(0,0,0,0.12) 6px)",
              }} />

              {/* Moving scan sweep */}
              {booted && (
                <div style={{
                  position: "absolute", left: 0, right: 0, height: "22%",
                  background: "linear-gradient(transparent,rgba(0,255,159,0.025) 50%,transparent)",
                  animation: "scanline 5.5s linear infinite",
                  pointerEvents: "none",
                }} />
              )}

              {/* ASCII lines */}
              <div style={{ position: "relative" }}>
                {frame.map((line, i) => renderLine(line, i, hover))}
              </div>

              {/* Corner label */}
              <div style={{
                position: "absolute", bottom: 4, right: 8,
                color: "#00ff9f1a", fontSize: 7, letterSpacing: "0.1em",
              }}>
                {hover ? "smirk" : "idle"}
              </div>
            </div>

            {/* Online dot */}
            {booted && (
              <div style={{
                position: "absolute", bottom: -2, right: -2,
                width: 10, height: 10, borderRadius: "50%",
                background: "#00ff9f",
                border: "2px solid #07070f",
                boxShadow: "0 0 8px rgba(0,255,159,0.8)",
                animation: "pulse 2.8s ease-in-out infinite",
              }} />
            )}
          </div>

          {/* Nameplate */}
          {booted && (
            <div style={{ marginTop: 20, animation: "fadeIn 0.6s ease 0.2s both" }}>
              <div style={{
                color: "#d0d0e0", fontSize: 13, fontWeight: 300,
                letterSpacing: "0.3em", textTransform: "uppercase",
              }}>
                Marko Stankovic
              </div>
              <div style={{
                color: "#00ff9f", fontSize: 8,
                letterSpacing: "0.38em", marginTop: 5, textTransform: "uppercase",
              }}>
                Game Developer · Unity · C#
              </div>
            </div>
          )}

          {/* Tagline */}
          {booted && (
            <div style={{
              marginTop: 10, color: "#00ff9f18", fontSize: 7,
              letterSpacing: "0.22em",
              animation: "pulse 5s ease-in-out infinite",
            }}>
              {hover ? "[ sup ]" : "[ Belgrade · available ]"}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
