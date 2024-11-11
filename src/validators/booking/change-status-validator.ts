import { z } from "zod";

export const changeStatusBookingSchema = z.object({
  status_surat: z.enum(["Diajukan", "Unduh", "Kadep"]),
});

export type ChangeStatusBookingType = z.infer<typeof changeStatusBookingSchema>;
