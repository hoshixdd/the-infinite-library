"use client";

import { useRef, type ReactNode, type HTMLAttributes } from "react";
import { magneticMove, magneticReset } from "@/lib/motion/scroll";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strength?: number;
  asChild?: boolean;
};

export function Magnetic({ children, strength = 0.08, className = "", ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      onMouseMove={(e) => {
        if (ref.current) magneticMove(ref.current, e, strength);
      }}
      onMouseLeave={() => {
        if (ref.current) magneticReset(ref.current);
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
