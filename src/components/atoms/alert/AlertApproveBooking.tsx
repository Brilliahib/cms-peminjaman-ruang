import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { BookingRoomApproved } from "@/types/booking/booking";

interface ApproveBookingProps {
  confirmApprove: () => void;
  data?: BookingRoomApproved | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
}

const ApproveBookingDialog = ({
  open,
  setOpen,
  confirmApprove,
  data,
  isPending,
}: ApproveBookingProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Terima Peminjaman?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menerima peminjaman untuk{" "}
            <strong>{data?.name}</strong>? Data yang sudah diterima tidak dapat
            dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({ variant: "default" })}
            onClick={confirmApprove}
          >
            Terima
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApproveBookingDialog;
