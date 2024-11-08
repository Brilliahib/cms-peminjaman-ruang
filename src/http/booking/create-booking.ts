import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { BookingType } from "@/validators/booking/booking-validator";
import { BookingRoomApproved } from "@/types/booking/booking";

interface BookingResponse {
  data: BookingRoomApproved;
}

export const addBookingHandler = async (
  body: BookingType,
  token: string
): Promise<BookingResponse> => {
  const { data } = await api.post("/booking", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddBooking = (
  options?: UseMutationOptions<BookingResponse, AxiosError<any>, BookingType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: BookingType) =>
      addBookingHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
