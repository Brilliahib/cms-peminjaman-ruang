import { Auth } from "../auth/auth";
import { Room } from "../room/room";

export interface BookingRoomApproved {
  id: number;
  user_id: number;
  room_id: number;
  start_time: Date;
  end_time: Date;
  name: string;
  is_approved: boolean;
  user: Auth;
  room: Room;
}
