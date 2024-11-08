import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Room } from "@/types/room/room";

interface GetDetailRoomParams {
  id: number;
}

interface GetDetailRoomResponse {
  data: Room;
}

export const getDetailRoomHandler = async ({
  id,
}: GetDetailRoomParams): Promise<GetDetailRoomResponse> => {
  const { data } = await api.get<GetDetailRoomResponse>(`/room/${id}`);

  return data;
};

export const useGetDetailRoom = (
  { id }: GetDetailRoomParams,
  options?: Partial<UseQueryOptions<GetDetailRoomResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["room-detail"],
    queryFn: () => getDetailRoomHandler({ id }),
    ...options,
  });
};
