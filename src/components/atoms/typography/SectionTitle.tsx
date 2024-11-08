interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </>
  );
}
