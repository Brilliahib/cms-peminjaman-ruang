import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllRoom } from "@/http/room/get-all-room";
import { Room } from "@/types/room/room";

interface SelectRoomProps {
  onRoomChange: (room: Room) => void;
}

export function SelectRoom({ onRoomChange }: SelectRoomProps) {
  const { data, isPending } = useGetAllRoom();

  return (
    <Select
      onValueChange={(value) => {
        const selectedRoom = data?.data.find(
          (room) => room.id === Number(value)
        );
        if (selectedRoom) {
          onRoomChange(selectedRoom);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={isPending ? "Loading..." : "Pilih ruangan"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ruangan</SelectLabel>
          {data?.data.map((room) => (
            <SelectItem key={room.id} value={String(room.id)}>
              {room.nama_ruangan}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
