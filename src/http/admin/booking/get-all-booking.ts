import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingRoomApproved } from "@/types/booking/booking";

interface GetAllBookingResponse {
  data: BookingRoomApproved[];
}

export const getAllBookingHandler = async (
  token: string
): Promise<GetAllBookingResponse> => {
  const { data } = await api.get<GetAllBookingResponse>("/booking", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllBooking = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllBookingResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["booking-list"],
    queryFn: () => getAllBookingHandler(token),
    ...options,
  });
};
