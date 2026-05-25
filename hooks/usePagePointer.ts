"use client";

import { useEffect, useRef } from "react";

export type NormalizedPointer = {
  x: number;
  y: number;
};

/**
 * Normalized pointer in clip space (-1 … 1), updated from document-level mouse moves.
 */
export function usePagePointer() {
  const pointer = useRef<NormalizedPointer>({ x: 0, y: 0 });

  useEffect(() => {
    const update = (clientX: number, clientY: number) => {
      pointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseMove = (event: MouseEvent) => {
      update(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        update(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return pointer;
}
