import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Room } from "@/types/room/room";

interface GetAllRoomResponse {
  data: Room[];
}

export const getAllRoomHandler = async (): Promise<GetAllRoomResponse> => {
  const { data } = await api.get<GetAllRoomResponse>("/room");

  return data;
};

export const useGetAllRoom = (
  options?: Partial<UseQueryOptions<GetAllRoomResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["room-list"],
    queryFn: getAllRoomHandler,
    ...options,
  });
};
