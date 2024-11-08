"use client";

import { bookingColumns } from "@/components/atoms/datacolumn/DataBooking";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllBookingUser } from "@/http/booking/get-all-booking-user";
import { useSession } from "next-auth/react";

export default function BookingListContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllBookingUser(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );
  return (
    <>
      <div className="pad-x">
        <div className="mb-8">
          <SectionTitle title="Persuratan" />
        </div>
        <DataTable columns={bookingColumns} data={data?.data ?? []} />
      </div>
    </>
  );
}
