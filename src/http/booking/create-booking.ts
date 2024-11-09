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
  const formData = new FormData();

  // Append simple fields
  formData.append("room_id", body.room_id.toString());
  formData.append("start_time", body.start_time);
  formData.append("end_time", body.end_time);
  formData.append("name", body.name);

  // Append students array
  body.students.forEach((student, index) => {
    formData.append(`students[${index}][name]`, student.name);
    formData.append(`students[${index}][nim]`, student.nim);

    // Append file for tanda_tangan
    if (student.tanda_tangan instanceof File) {
      formData.append(`students[${index}][tanda_tangan]`, student.tanda_tangan);
    }
  });

  const { data } = await api.post("/booking", formData, {
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
