"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Eye, SquarePen, CheckCheck } from "lucide-react";
import { BookingRoomApproved } from "@/types/booking/booking";
import { Badge } from "@/components/ui/badge";

interface BookingAdminProps extends BookingRoomApproved {
  approveBookingHandler: (data: BookingAdminProps) => void;
}

export const bookingAdminColumns: ColumnDef<BookingAdminProps>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Acara",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.name}
        </p>
      );
    },
  },
  {
    accessorKey: "is_approved",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge variant={data.is_approved ? "success" : "destructive"}>
          {data.is_approved ? "Diterima" : "Belum Diterima"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status_surat",
    header: "Status Surat",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Badge
          variant={
            data.status_surat === "Diajukan"
              ? "success"
              : data.status_surat === "Kadep"
              ? "default"
              : "destructive"
          }
        >
          {data.status_surat === "Diajukan"
            ? "Diajukan"
            : data.status_surat === "Kadep"
            ? "Kadep"
            : "Unduh"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-green-500 cursor-pointer focus:text-green-700"
            onClick={() => data.approveBookingHandler(data)}
          >
            <CheckCheck className="h-4 w-4 " />
            <span className="ml-2 ">Terima Peminjaman</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/article/${data.id}`}
              className="flex items-center text-orange-700"
            >
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Ubah Status Surat</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
