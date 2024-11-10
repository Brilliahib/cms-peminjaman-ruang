import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { BookingRoomApproved } from "@/types/booking/booking";

interface BookingResponse {
  data: BookingRoomApproved;
}

export const approveBookingHandler = async (
  id: string,
  token: string
): Promise<BookingResponse> => {
  const { data } = await api.post(`/booking/approve/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useApproveBooking = (
  options?: UseMutationOptions<BookingResponse, AxiosError<any>, string>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      approveBookingHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
