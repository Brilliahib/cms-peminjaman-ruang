// hooks/booking/change-status-booking.ts
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { BookingRoomApproved } from "@/types/booking/booking";
import { ChangeStatusBookingType } from "@/validators/booking/change-status-validator";

interface ChangeStatusBookingResponse {
  data: BookingRoomApproved;
}

export const addChangeStatusBookingHandler = async (
  id: number,
  body: ChangeStatusBookingType,
  token: string
): Promise<ChangeStatusBookingResponse> => {
  const { data } = await api.patch(`/booking/status/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useChangeStatusBooking = (
  options?: UseMutationOptions<
    ChangeStatusBookingResponse,
    AxiosError<any>,
    { id: number; body: ChangeStatusBookingType }
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      addChangeStatusBookingHandler(
        id,
        body,
        sessionData?.access_token as string
      ),
    ...options,
  });
};
