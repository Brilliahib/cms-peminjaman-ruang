import { PropsWithChildren } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return redirect("/");
  }

  return <>{children}</>;
}