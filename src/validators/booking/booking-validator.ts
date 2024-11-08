import { z } from "zod";

export const bookingSchema = z.object({
  room_id: z.number().min(1, { message: "Room ID harus diisi" }),
  start_time: z
    .string()
    .min(1, { message: "Jam mulai harus diisi" })
    .regex(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
      message: "Format jam mulai tidak valid",
    }),
  end_time: z
    .string()
    .min(1, { message: "Jam selesai harus diisi" })
    .regex(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
      message: "Format jam selesai tidak valid",
    }),
  name: z.string().min(1, { message: "Nama harus diisi" }).trim(),
});

export type BookingType = z.infer<typeof bookingSchema>;
