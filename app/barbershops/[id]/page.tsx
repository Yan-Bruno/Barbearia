import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({ where: { id } });

  if (!barbershop) {
    return notFound();
  }

  return <h1>BarbershopPage{barbershop?.name}</h1>;
};

export default BarbershopPage;
