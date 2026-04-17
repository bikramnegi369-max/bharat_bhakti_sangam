/// =============================
/// FILE: MarqueeItem.tsx
/// =============================

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function MarqueeItem({ children }: Props) {
  return (
    <div
      className="
        shrink-0
        whitespace-nowrap
        flex
        items-center
      "
    >
      {children}
    </div>
  );
}
