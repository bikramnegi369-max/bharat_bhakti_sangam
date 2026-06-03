import Link from "next/link";
import { TOP_NAV_LINKS } from "../../../_config/Navigation.config";

/**
 * Renders a top navigation bar with utility links.
 */
export default function TopNavigationBar() {
  return (
    <div
      className="bg-[#474747] text-[#E6E6E6] text-xs py-2 hidden lg:block lg:px-[clamp(2rem,calc(-2.923rem+7.692vw),4rem)]"
      aria-label="Top navigation bar with utility links"
    >
      <div className=" mx-auto flex justify-end space-x-4">
        {TOP_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-primary transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
