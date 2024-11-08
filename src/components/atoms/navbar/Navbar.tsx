import Image from "next/image";

export default function Navbar() {
  return (
    <div className="bg-primary p-4 flex md:flex-row flex-col md:gap-0 gap-4 justify-between items-center">
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
    </div>
  );
}
