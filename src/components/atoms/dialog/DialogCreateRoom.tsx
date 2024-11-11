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

interface DialogCreateRoomProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateRoom({
  open,
  setOpen,
}: DialogCreateRoomProps) {
  const form = useForm<RoomType>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      nama_ruangan: "",
      kapasitas_ruangan: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addRoomHandler, isPending } = useAddRoom({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan ruangan!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan ruangan!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["room-list"],
      });
      router.refresh();
    },
  });

  const onSubmit = (body: RoomType) => {
    addRoomHandler(body);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Ruangan</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="nama_ruangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Ruangan</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan nama ruangan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kapasitas_ruangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kapasitas Ruangan</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan kapasitas ruangan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
