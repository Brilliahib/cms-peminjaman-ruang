"use client";

import { roomColumns } from "@/components/atoms/datacolumn/DataRoom";
import DialogCreateRoom from "@/components/atoms/dialog/DialogCreateRoom";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllRoom } from "@/http/room/get-all-room";
import { useState } from "react";

export default function RoomAdminContent() {
  const { data, isPending } = useGetAllRoom();
  const [dialogCreateRoomOpen, setDialogCreateRoomOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogCreateRoomOpen(true);
  };
  return (
    <>
      <div className="pad-x">
        <div className="md:space-y-8 space-y-6 mb-8">
          <SectionTitle title="Ruangan" />
          <Button onClick={handleDialogOpen}>Tambah Ruangan</Button>
        </div>
        <DataTable columns={roomColumns} data={data?.data ?? []} />
      </div>
      <DialogCreateRoom
        open={dialogCreateRoomOpen}
        setOpen={setDialogCreateRoomOpen}
      />
    </>
  );
}
