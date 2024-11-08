"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAddBooking } from "@/http/booking/create-booking";
import { useGetDetailRoom } from "@/http/room/get-detail-room";
import {
  bookingSchema,
  BookingType,
} from "@/validators/booking/booking-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function BookingFormContent() {
  const { id } = useParams();
  const form = useForm<BookingType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      start_time: "",
      end_time: "",
      room_id: Number(id),
    },
    mode: "onChange",
  });

  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: addBookingHandler } = useAddBooking({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal melakukan booking ruangan!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil melakukan booking ruangan!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["booking-list"],
      });
      router.push("/bookings");
    },
  });

  const onSubmit = (body: BookingType) => {
    addBookingHandler({ ...body, room_id: Number(id) });
  };
  const { data: room } = useGetDetailRoom({ id: Number(id) });
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 pad-x mt-8">
        <div>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <h1>{room?.data.nama_ruangan}</h1>
                <p>{room?.data.kapasitas_ruangan} orang</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="p-4">
              <div>
                <Form {...form}>
                  <form
                    className="space-y-5 pt-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Acara</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Masukkan nama acara"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="start_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jam Mulai</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="end_time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jam Selesai</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="text-muted-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit">Booking</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}