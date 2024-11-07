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
          <SelectItem value="A">Ruangan 201</SelectItem>
          <SelectItem value="B">Ruangan 202</SelectItem>
          <SelectItem value="C">Ruangan 203</SelectItem>
          <SelectItem value="D">Ruangan 204</SelectItem>
          <SelectItem value="E">Ruangan 401</SelectItem>
          <SelectItem value="F">Ruangan 402</SelectItem>
          <SelectItem value="G">Ruangan 403</SelectItem>
          <SelectItem value="H">Ruangan 404</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
