import BookingFormContent from "@/components/organisms/booking/BookingFormContent";

interface BookingDetailProps {
  params: { id: number };
}

export default function BookingDetailPage({ params }: BookingDetailProps) {
  return (
    <>
      <BookingFormContent />
    </>
  );
}
