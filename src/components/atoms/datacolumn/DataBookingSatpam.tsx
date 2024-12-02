"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BookingRoomApproved } from "@/types/booking/booking";
import { Badge } from "@/components/ui/badge";

export const bookingSatpamColumns: ColumnDef<BookingRoomApproved>[] = [
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
              ? "success"
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
];
