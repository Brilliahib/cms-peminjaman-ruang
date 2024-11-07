"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/atoms/navbar/Navbar";

interface Event {
  title: string;
  date: string;
}

type Room = "A" | "B" | "C" | "D" | "E";

export default function HomeContent() {
  // Data booking per ruangan
  const bookingData: Record<Room, Event[]> = {
    A: [{ title: "Praktikum", date: "2024-11-07T09:00:00" }],
    B: [{ title: "Meeting B1", date: "2024-11-07T10:00:00" }],
    C: [{ title: "Meeting C1", date: "2024-11-07T11:00:00" }],
    D: [{ title: "Meeting D1", date: "2024-11-07T12:00:00" }],
    E: [{ title: "Meeting E1", date: "2024-11-07T13:00:00" }],
  };

  const [events, setEvents] = useState<Event[]>(bookingData.A);

  const handleRoomChange = (room: Room) => {
    setEvents(bookingData[room] || []);
  };

  return (
    <>
      <Navbar onRoomChange={handleRoomChange} />
      <div className="p-8">
        <Card>
          <CardContent className="p-6">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="timeGridDay"
              events={events}
              height="auto"
              slotMinTime="08:00:00"
              slotMaxTime="18:00:00"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridDay,dayGridMonth",
              }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
