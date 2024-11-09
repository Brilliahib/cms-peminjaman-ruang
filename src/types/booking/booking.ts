import { Auth } from "../auth/auth";
import { Mahasiswa } from "../mahasiswa/mahasiswa";
import { Room } from "../room/room";

export interface BookingRoomApproved {
  id: number;
  user_id: number;
  room_id: number;
  start_time: Date;
  end_time: Date;
  name: string;
  is_approved: boolean;
  status_surat: string;
  user: Auth;
  room: Room;
  students: Mahasiswa[];
}
