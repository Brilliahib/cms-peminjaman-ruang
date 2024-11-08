"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/atoms/navbar/Navbar";
import { Room } from "@/types/room/room";
import { SelectRoom } from "@/components/atoms/select/SelectRoom";

interface Event {
  title: string;
  date: string;
}

export default function HomeContent() {
  const bookingData: Record<number, Event[]> = {
    1: [{ title: "Praktikum", date: "2024-11-07T09:00:00" }],
    2: [{ title: "Meeting B1", date: "2024-11-07T10:00:00" }],
    3: [{ title: "Meeting C1", date: "2024-11-07T11:00:00" }],
    4: [{ title: "Meeting D1", date: "2024-11-07T12:00:00" }],
    5: [{ title: "Meeting E1", date: "2024-11-07T13:00:00" }],
  };

  const [events, setEvents] = useState<Event[]>(bookingData[1] || []);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  const handleRoomChange = (room: Room) => {
    setEvents(bookingData[room.id] || []);
  };

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
