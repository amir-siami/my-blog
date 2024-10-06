import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  name: string;
  href: string;
  icon?: React.ReactNode;
  classes?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ name, href, icon, classes }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li
      key={name}
      className={clsx(
        "hover:text-slate-400 transition-colors",
        classes,
        isActive && "text-slate-600 font-semibold"
      )}
    >
      <Link
        href={href}
        className={clsx(
          "flex items-center gap-4",
          classes,
          isActive && "border-b-2 border-slate-600"
        )}
      >
        {icon && <span>{icon}</span>}
        {name}
      </Link>
    </li>
  );
};

export default NavLink;
