"use client";

import { Button } from "@/_components/ui/Button";
import { useRouter } from "next/navigation";

interface CTAButtonProps {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
}

export const CTAButton = ({
  label,
  href,
  variant = "primary",
  className,
  external = false,
}: CTAButtonProps) => {
  const router = useRouter();

  if (external) {
    return (
      <Button
        variant={variant}
        type="button"
        className={className}
        onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      type="button"
      className={className}
      onClick={() => router.push(href)}
    >
      {label}
    </Button>
  );
};
