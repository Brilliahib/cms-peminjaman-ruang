"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SelectRoom } from "@/components/atoms/select/SelectRoom";
import { useGetAllBookingApproved } from "@/http/booking/get-all-booking-approved";
import { useRouter } from "next/navigation";
import { Room } from "@/types/room/room";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}

export default function HomeContent() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { data, isPending } = useGetAllBookingApproved(
    { id: selectedRoom?.id || 1 },
    {
      enabled: !!selectedRoom,
    }
  );
  const router = useRouter();

  const handleRoomChange = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleSelect = (selectionInfo: any) => {
    if (selectedRoom) {
      const { startStr, endStr } = selectionInfo;
      const roomId = selectedRoom.id;
      router.push(
        `/bookings/${roomId}?start_time=${startStr}&end_time=${endStr}`
      );
    } else {
      alert("Pilih ruangan terlebih dahulu!");
    }
  };

  const events: Event[] =
    data?.data.map((booking) => {
      const startDate = new Date(booking.start_time);
      const endDate = new Date(booking.end_time);

      return {
        id: booking.id.toString(),
        title: booking.name,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      };
    }) || [];

  const isMobileView =
    typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <>
      <div className="pad-x">
        <Card>
          <CardContent className="p-6">
            <div className="py-4 md:py-6 flex justify-end">
              <SelectRoom onRoomChange={handleRoomChange} />
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              events={events}
              height="auto"
              slotMinTime="08:00:00"
              slotMaxTime="18:00:00"
              selectable={true}
              select={handleSelect}
              dayCellClassNames={() => "cursor-pointer"}
              headerToolbar={
                isMobileView
                  ? {
                      left: "",
                      center: "title",
                      right: "",
                    }
                  : {
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek",
                    }
              }
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
