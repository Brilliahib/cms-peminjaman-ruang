import Link from "next/link";

import { cn } from "@/lib/utils";

interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function NavLink({ href, label, active }: Link) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm flex items-center rounded px-5 py-2 font-semibold",
        {
          "text-white": !active,
          "font-bold text-white": active,
        }
      )}
    >
      {label}
    </Link>
  );
}
