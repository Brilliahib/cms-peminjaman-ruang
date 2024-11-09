"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import NavButton from "@/components/atoms/navbar/NavButton";
import NavL from "@/components/atoms/navbar/NavL";
import NavLink from "@/components/atoms/navbar/NavLink";
import { useSession } from "next-auth/react";

export interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();
  const session = useSession();

  const links = useMemo(
    () => [
      {
        href: "/",
        label: "Beranda",
        active: pathname === "/",
      },
      {
        href: "/bookings",
        label: "Persuratan",
        active: pathname === "/bookings",
      },
      ...(session.data?.user.role === "admin"
        ? [
            {
              href: "/admin/rooms",
              label: "Rooms",
              active: pathname === "/admin/rooms",
            },
            {
              href: "/admin/bookings",
              label: "Booking",
              active: pathname === "/admin/bookings",
            },
          ]
        : []),
    ],
    [pathname]
  );

  return (
    <>
      <div className="w-full bg-primary z-50 sticky top-0 md:mb-0 mb-6">
        <div className="flex md:mb-8 justify-between bg-primary py-2 pad-x">
          <NavL />
          <nav className="hidden items-center font-semibold md:flex">
            {links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
          <NavButton links={links} />
        </div>
      </div>
    </>
  );
}
