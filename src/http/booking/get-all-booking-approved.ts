import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { BookingRoomApproved } from "@/types/booking/booking";

interface GetAllBookingApprovedParams {
  id: number;
}

interface GetAllBookingApprovedResponse {
  data: BookingRoomApproved[];
}

export const getAllBookingApprovedHandler = async ({
  id,
}: GetAllBookingApprovedParams): Promise<GetAllBookingApprovedResponse> => {
  const { data } = await api.get<GetAllBookingApprovedResponse>(
    `/booking/room/${id}`
  );

  return data;
};

export const useGetAllBookingApproved = (
  { id }: GetAllBookingApprovedParams,
  options?: Partial<UseQueryOptions<GetAllBookingApprovedResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["booking-approved-list"],
    queryFn: () => getAllBookingApprovedHandler({ id }),
    ...options,
  });
};
