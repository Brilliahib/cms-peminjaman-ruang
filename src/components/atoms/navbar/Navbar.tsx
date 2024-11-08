"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { generateFallbackFromName } from "@/utils/misc";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

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
      ...(session?.user.role === "admin"
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
    [pathname, session]
  );

  return (
    <div className="bg-primary flex py-2 justify-between items-center pad-x md:mb-12 mb-8">
      <div className="flex gap-4 items-center text-white">
        <Image
          src={"/images/undip.png"}
          alt="Universitas Diponegoro"
          width={1155}
          height={404}
          className="max-w-[50px]"
        />
        <div>
          <h1 className="font-bold">Sistem Informasi Peminjaman Ruang</h1>
          <p>Teknik Industri</p>
        </div>
      </div>
      <div className="flex items-center gap-8 text-white">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:underline ${link.active ? "underline" : ""}`}
          >
            {link.label}
          </Link>
        ))}

        {session ? (
          <DropdownMenu>
            <div className="flex items-center gap-5">
              <DropdownMenuTrigger asChild>
                <Button variant="tertiary" size="icon" className="rounded-full">
                  <Avatar className="border border-muted">
                    <AvatarFallback className="text-gray-700 ">
                      {generateFallbackFromName(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent align="end" className="font-poppins">
              <DropdownMenuLabel>
                <p>{session.user.name}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/20"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
