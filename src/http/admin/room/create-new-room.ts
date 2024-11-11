import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Room } from "@/types/room/room";
import { RoomType } from "@/validators/room/room-validator";

interface RoomResponse {
  data: Room;
}

export const addRoomHandler = async (
  body: RoomType,
  token: string
): Promise<RoomResponse> => {
  const { data } = await api.post("/room", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useAddRoom = (
  options?: UseMutationOptions<RoomResponse, AxiosError<any>, RoomType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: RoomType) =>
      addRoomHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
