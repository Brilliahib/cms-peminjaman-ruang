import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-primary flex py-2 justify-between items-center pad-x md:mb-12 mb-8">
      <div className="flex gap-4 items-center text-white">
        <Image
          src={"/images/undip.png"}
          alt="Universitas Diponegoro"
          width={1155}
          height={404}
          className="max-w-[50px]"
        />
        <div>
          <h1 className="font-bold">Sistem Informasi Peminjaman Ruang</h1>
          <p>Teknik Industri</p>
        </div>
      </div>
      <div className="flex gap-8 text-white">
        <Link href={"/"} className="hover:underline">
          Beranda
        </Link>
        <Link href={"/booking"} className="hover:underline">
          Persuratan
        </Link>
      </div>
    </div>
  );
}
