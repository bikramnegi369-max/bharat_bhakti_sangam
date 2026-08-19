import Link from "next/link";
import clsx from "clsx";

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
  const buttonStyles = clsx(
    "CTAButton relative overflow-hidden px-5 py-2 rounded-xl font-medium transition-all duration-200 text-[16px] cursor-pointer inline-flex w-fit items-center justify-center active:scale-95",
    // Centered Ripple pseudo-element
    "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-5 after:h-5 after:bg-white/40 after:rounded-full after:opacity-0 after:pointer-events-none after:-translate-x-1/2 after:-translate-y-1/2",
    variant === "primary" &&
      "bg-primary border-2 border-primary hover:bg-primary/90 text-white",
    variant === "secondary" &&
      "text-primary border-2 border-primary hover:bg-primary/10",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles}
      >
        <span className="relative z-10">{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={buttonStyles}>
      <span className="relative z-10">{label}</span>
    </Link>
  );
};
