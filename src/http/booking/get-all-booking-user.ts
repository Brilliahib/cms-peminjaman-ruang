import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingRoomApproved } from "@/types/booking/booking";

interface GetAllBookingUserResponse {
  data: BookingRoomApproved[];
}

export const GetAllBookingUserHandler = async (
  token: string
): Promise<GetAllBookingUserResponse> => {
  const { data } = await api.get<GetAllBookingUserResponse>("/booking/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllBookingUser = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllBookingUserResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["booking-user-list"],
    queryFn: () => GetAllBookingUserHandler(token),
    ...options,
  });
};
