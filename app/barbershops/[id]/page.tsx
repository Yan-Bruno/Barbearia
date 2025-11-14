import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { PageContainer } from "@/app/components/ui/page";
import { PageSection } from "@/app/components/ui/page";
import { PageSectionTitle } from "@/app/components/ui/page";
import { ServiceItem } from "./components/service-item";
import { CopyPhoneButton } from "./components/copy-phone-button";
import { ChevronLeft, Phone } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BarbershopPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <main className="bg-background relative flex min-h-screen flex-col items-start overflow-clip">
      {/* Header with Banner */}
      <div className="relative h-[297px] w-full shrink-0">
        <div className="absolute inset-0">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute top-6 left-5">
          <Link href="/">
            <Button
              variant="secondary"
              size="icon"
              className="bg-background rounded-full"
            >
              <ChevronLeft className="size-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-background relative -mt-6 flex w-full shrink-0 flex-col items-start rounded-tl-[24px] rounded-tr-[24px]">
        <PageContainer>
          {/* Barbershop Info */}
          <div className="flex items-center gap-1.5 px-5 pt-6 pb-0">
            <div className="relative flex shrink-0 flex-col items-start gap-1">
              <div className="relative flex shrink-0 items-start gap-1.5">
                <div className="relative size-[30px] shrink-0 rounded-full">
                  <Image
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                </div>
                <h1 className="text-foreground relative shrink-0 text-xl leading-normal font-bold">
                  {barbershop.name}
                </h1>
              </div>
              <div className="relative flex shrink-0 flex-col items-start gap-2">
                <div className="relative flex shrink-0 items-center gap-2">
                  <p className="text-muted-foreground relative shrink-0 text-sm leading-[1.4] font-normal">
                    {barbershop.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* About Section */}
          <PageSection>
            <PageSectionTitle>SOBRE NÓS</PageSectionTitle>
            <p className="text-foreground relative min-w-full shrink-0 text-sm leading-[1.4] font-normal whitespace-pre-wrap">
              {barbershop.description}
            </p>
          </PageSection>

          <Separator className="my-6" />

          {/* Services Section */}
          <PageSection>
            <PageSectionTitle>SERVIÇOS</PageSectionTitle>
            <div className="flex flex-col gap-3">
              {barbershop.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </div>
          </PageSection>

          <Separator className="my-6" />

          {/* Contact Section */}
          <PageSection>
            <PageSectionTitle>CONTATO</PageSectionTitle>
            <div className="flex flex-col gap-4">
              {barbershop.phones.map((phone) => (
                <div
                  key={phone}
                  className="relative flex w-full shrink-0 items-center justify-between"
                >
                  <div className="relative flex shrink-0 items-center gap-2.5">
                    <Phone className="size-6 shrink-0" />
                    <p className="text-foreground relative shrink-0 text-sm leading-[1.4] font-normal">
                      {phone}
                    </p>
                  </div>
                  <CopyPhoneButton phone={phone} />
                </div>
              ))}
            </div>
          </PageSection>

          {/* Footer */}
          <div className="relative flex w-full shrink-0 flex-col items-center gap-2.5 px-0 pt-[60px] pb-0">
            <div className="bg-secondary relative flex w-full shrink-0 flex-col items-start justify-center gap-1.5 overflow-clip px-[30px] py-8 text-xs leading-none">
              <p className="text-foreground relative shrink-0 font-semibold">
                © 2025 Copyright Aparatus
              </p>
              <p className="text-muted-foreground relative shrink-0 font-normal">
                Todos os direitos reservados.
              </p>
            </div>
          </div>
        </PageContainer>
      </div>
    </main>
  );
};

export default BarbershopPage;
