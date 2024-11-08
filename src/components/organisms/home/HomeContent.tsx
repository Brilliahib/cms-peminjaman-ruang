"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/atoms/navbar/Navbar";
import { Room } from "@/types/room/room";
import { SelectRoom } from "@/components/atoms/select/SelectRoom";
import { useGetAllBookingApproved } from "@/http/booking/get-all-booking-approved";

interface Event {
  title: string;
  start: string;
  end: string;
}

export default function HomeContent() {
  const [selectedRoom, setSelectedRoom] = useState<Room | 1>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { data, isPending } = useGetAllBookingApproved(
    { id: selectedRoom?.id || 1 },
    {
      enabled: !!selectedRoom,
    }
  );

  useEffect(() => {
    if (!data || isPending) return;
    const roomEvents = data.data.map((booking) => ({
      title: booking.name,
      start: `2024-11-07T${booking.start_time}`,
      end: `2024-11-07T${booking.end_time}`,
    }));

    setEvents(roomEvents);
  }, [data, isPending]);

  const handleRoomChange = (room: Room) => {
    setSelectedRoom(room);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:p-8 p-4">
        <Card>
          <CardContent className="p-6">
            <div className="py-4 md:py-6 flex justify-end">
              <SelectRoom onRoomChange={handleRoomChange} />
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="timeGridDay"
              events={events}
              height="auto"
              slotMinTime="08:00:00"
              slotMaxTime="18:00:00"
              headerToolbar={
                isMobile
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
