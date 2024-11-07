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

type Room = "A" | "B" | "C" | "D" | "E";

interface SelectRoomProps {
  onRoomChange: (room: Room) => void;
}

export function SelectRoom({ onRoomChange }: SelectRoomProps) {
  const handleSelectChange = (value: string) => {
    onRoomChange(value as Room);
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a room" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Room</SelectLabel>
          <SelectItem value="A">Ruangan A</SelectItem>
          <SelectItem value="B">Ruangan B</SelectItem>
          <SelectItem value="C">Ruangan C</SelectItem>
          <SelectItem value="D">Ruangan D</SelectItem>
          <SelectItem value="E">Ruangan E</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
