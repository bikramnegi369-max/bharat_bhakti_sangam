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
        text-xs lg:text-sm
      "
    >
      {children}
    </div>
  );
}
