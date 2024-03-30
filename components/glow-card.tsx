"use client";

import { useEffect, useRef } from "react";

const GlowCard = ({ children }: { children: React.ReactNode }) => {
  const cardsContainer = useRef<HTMLDivElement>(null);

  const applyOverlayMask = (e: PointerEvent) => {
    const documentTarget = e.currentTarget as Element;

    if (!cardsContainer.current) {
      return;
    }

    // Calculate the x and y coordinates of the mouse relative to the cards container
    const x = e.pageX - cardsContainer.current.offsetLeft;
    const y = e.pageY - cardsContainer.current.offsetTop;

    // Update the css variables
    cardsContainer.current.setAttribute(
      "style",
      `--x: ${x}px; --y: ${y}px; --opacity: 1`
    );
  };

  useEffect(() => {
    document.body.addEventListener("pointermove", (e) => {
      applyOverlayMask(e);
    });
  }, []);

  return (
    <div className="relative" ref={cardsContainer}>
      <div className="glass">{children}</div>
      <div
        className="select-none pointer-events-none text-transparent border p-5 rounded-xl absolute inset-0"
        style={{
          opacity: "var(--opacity, 0)",
          mask: `
                radial-gradient(
                  10rem 10rem at var(--x) var(--y),
                  #000 1%,
                  transparent 50%
                )`,
          WebkitMask: `
                radial-gradient(
                  10rem 10rem at var(--x) var(--y),
                  #000 1%,
                  transparent 50%
                )`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GlowCard;
