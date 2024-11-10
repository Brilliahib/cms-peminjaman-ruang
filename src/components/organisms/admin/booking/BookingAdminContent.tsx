"use client";

import ApproveBookingDialog from "@/components/atoms/alert/AlertApproveBooking";
import { bookingAdminColumns } from "@/components/atoms/datacolumn/DataBookingAdmin";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useToast } from "@/hooks/use-toast";
import { useApproveBooking } from "@/http/admin/booking/add-approve-booking";
import { useGetAllBooking } from "@/http/admin/booking/get-all-booking";
import { BookingRoomApproved } from "@/types/booking/booking";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function BookingAdminContent() {
  const { data: session, status } = useSession();
  const [selectedBooking, setSelectedBooking] =
    useState<BookingRoomApproved | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [openAlertDelete, setOpenAlertDelete] = useState<boolean>(false);
  const { data, isPending } = useGetAllBooking(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  const { mutate: deleteQuestionBank, isPending: isDeletePending } =
    useApproveBooking({
      onSuccess: () => {
        setSelectedBooking(null);
        toast({
          title: "Berhasil menerima peminjaman ruangan!",
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["booking-list"],
        });
      },
      onError: (error) => {
        toast({
          title: "Gagal menerima peminjaman ruangan!",
          variant: "destructive",
          description: error.response?.data.message,
        });
      },
    });

  const approveBookingHandler = (data: BookingRoomApproved) => {
    setSelectedBooking(data);
    setOpenAlertDelete(true);
  };

  const handleApproveBooking = () => {
    if (selectedBooking?.id) {
      deleteQuestionBank(selectedBooking.id.toString());
    }
  };

  return (
    <>
      <div className="pad-x">
        <div className="mb-8">
          <SectionTitle title="Daftar Peminjaman Ruangan" />
        </div>
        <DataTable
          columns={bookingAdminColumns}
          data={
            data?.data.map((site) => ({
              ...site,
              approveBookingHandler: approveBookingHandler,
            })) ?? []
          }
        />
      </div>
      <ApproveBookingDialog
        open={openAlertDelete}
        setOpen={setOpenAlertDelete}
        confirmApprove={handleApproveBooking}
        data={selectedBooking}
        isPending={isDeletePending}
      />
    </>
  );
}
