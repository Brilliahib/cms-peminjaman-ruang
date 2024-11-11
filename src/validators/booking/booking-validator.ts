import { z } from "zod";

export const bookingSchema = z.object({
  room_id: z.number().min(1, { message: "Room ID harus diisi" }),
  start_time: z
    .string()
    .min(1, { message: "Tanggal dan waktu mulai harus diisi" })
    .regex(/^\d{4}-\d{2}-\d{2}T([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
      message: "Format tanggal dan waktu mulai tidak valid",
    }),
  end_time: z
    .string()
    .min(1, { message: "Tanggal dan waktu selesai harus diisi" })
    .regex(/^\d{4}-\d{2}-\d{2}T([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, {
      message: "Format tanggal dan waktu selesai tidak valid",
    }),
  name: z.string().min(1, { message: "Nama harus diisi" }).trim(),
  students: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Nama siswa harus diisi" }).trim(),
        nim: z.string().min(1, { message: "NIM harus diisi" }).trim(),
        tanda_tangan: z.union([
          z.string().min(1, { message: "Tanda tangan harus diisi" }).trim(),
          z.instanceof(File).or(z.string()),
        ]),
      })
    )
    .min(1, { message: "Setidaknya satu siswa harus ada" }),
});

export type BookingType = z.infer<typeof bookingSchema>;
