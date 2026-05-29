import Link from "next/link";

type BlogBreadcrumbProps = {
  title?: string;
};

export default function BlogBreadcrumb({ title }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="pt-5 pb-2">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-stone-400">
        <li>
          <Link
            href="/"
            className="transition-colors duration-150 hover:text-amber-600"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="select-none">
          /
        </li>
        <li>
          <Link
            href="/blog"
            className="transition-colors duration-150 hover:text-amber-600"
          >
            Blog
          </Link>
        </li>
        {title && (
          <>
            <li aria-hidden="true" className="select-none">
              /
            </li>
            <li
              className="max-w-[220px] truncate font-medium text-stone-700 sm:max-w-none"
              aria-current="page"
            >
              {title}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

