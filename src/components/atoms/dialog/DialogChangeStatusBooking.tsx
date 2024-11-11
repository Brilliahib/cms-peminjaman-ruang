import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { roomSchema, RoomType } from "@/validators/room/room-validator";
import { useAddRoom } from "@/http/admin/room/create-new-room";
import {
  changeStatusBookingSchema,
  ChangeStatusBookingType,
} from "@/validators/booking/change-status-validator";
import { useChangeStatusBooking } from "@/http/booking/change-status-booking";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DialogChangeStatusBookingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number | null;
}

export default function DialogChangeStatusBooking({
  open,
  setOpen,
  id,
}: DialogChangeStatusBookingProps) {
  const form = useForm<ChangeStatusBookingType>({
    resolver: zodResolver(changeStatusBookingSchema),
    defaultValues: {
      status_surat: "Unduh",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addRoomHandler, isPending } = useChangeStatusBooking({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal merubah status surat!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil merubah status surat!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["booking-list"],
      });
      router.refresh();
    },
  });

  const onSubmit = (body: ChangeStatusBookingType) => {
    if (id) {
      addRoomHandler({ id: id, body });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ubah Status Surat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="status_surat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Surat</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status surat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status Surat</SelectLabel>
                          <SelectItem value="Diajukan">Diajukan</SelectItem>
                          <SelectItem value="Unduh">Diunduh</SelectItem>
                          <SelectItem value="Kadep">Kadep</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Ubah"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
