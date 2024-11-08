"use client";

import { roomColumns } from "@/components/atoms/datacolumn/DataRoom";
import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllRoom } from "@/http/room/get-all-room";

export default function RoomAdminContent() {
  const { data, isPending } = useGetAllRoom();
  return (
    <>
      <div className="pad-x">
        <div className="mb-8">
          <SectionTitle title="Ruangan" />
        </div>
        <DataTable columns={roomColumns} data={data?.data ?? []} />
      </div>
    </>
  );
}
