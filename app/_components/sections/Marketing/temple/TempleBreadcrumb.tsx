import Link from "next/link";

interface TempleBreadcrumbProps {
  templeName: string;
}

/**
 * Accessible breadcrumb nav.
 * Uses an <ol> with aria-label for screen readers.
 * `aria-current="page"` marks the active (last) crumb.
 */
export default function TempleBreadcrumb({ templeName }: TempleBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="pt-5 pb-2">
      <ol className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-xs text-stone-400">
        <li>
          <Link
            href="/"
            className="hover:text-amber-600 transition-colors duration-150"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="select-none">
          /
        </li>
        <li>
          <Link
            href="/famous-temples"
            className="hover:text-amber-600 transition-colors duration-150"
          >
            Famous Temples
          </Link>
        </li>
        <li aria-hidden="true" className="select-none">
          /
        </li>
        <li
          className="text-stone-700 font-medium truncate max-w-[160px] sm:max-w-none"
          aria-current="page"
        >
          {templeName}
        </li>
      </ol>
    </nav>
  );
}
