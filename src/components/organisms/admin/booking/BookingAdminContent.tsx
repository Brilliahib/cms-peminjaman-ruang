"use client";

import { bookingAdminColumns } from "@/components/atoms/datacolumn/DataBookingAdmin";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllBooking } from "@/http/admin/booking/get-all-booking";
import { useSession } from "next-auth/react";

export default function BookingAdminContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllBooking(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );
  return (
    <>
      <div className="pad-x">
        <div className="mb-8">
          <SectionTitle title="Daftar Peminjaman Ruangan" />
        </div>
        <DataTable columns={bookingAdminColumns} data={data?.data ?? []} />
      </div>
    </>
  );
}
