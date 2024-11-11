import { z } from "zod";

export const roomSchema = z.object({
  nama_ruangan: z.string().min(1, { message: "Nama ruangan harus diisi" }),
  kapasitas_ruangan: z
    .string()
    .min(1, { message: "Kapasitas ruangan harus diisi" }),
});

export type RoomType = z.infer<typeof roomSchema>;
