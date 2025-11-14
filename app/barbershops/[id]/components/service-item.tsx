"use client";

import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import type { BarbershopService } from "@/generated/prisma";

interface ServiceItemProps {
  service: BarbershopService;
}

export function ServiceItem({ service }: ServiceItemProps) {
  const priceInReais = (service.priceInCents / 100)
    .toFixed(2)
    .replace(".", ",");

  return (
    <div className="bg-card border-border flex w-full items-center gap-3 rounded-2xl border p-3">
      <div className="relative size-[110px] shrink-0 rounded-[10px]">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-[10px] object-cover"
        />
      </div>
      <div className="relative flex h-full min-h-px min-w-px flex-1 shrink-0 flex-col items-start justify-between">
        <div className="relative flex h-[67.5px] w-full shrink-0 flex-col items-start gap-1 text-sm leading-[1.4]">
          <p className="text-card-foreground relative w-full shrink-0 font-bold">
            {service.name}
          </p>
          <p className="text-muted-foreground relative w-full shrink-0 font-normal">
            {service.description}
          </p>
        </div>
        <div className="relative flex w-full shrink-0 items-center justify-between">
          <p className="text-card-foreground relative shrink-0 text-sm leading-[1.4] font-bold">
            R$ {priceInReais}
          </p>
          <Button
            variant="default"
            className="rounded-full px-4 py-2"
            onClick={() => {}}
          >
            <span className="text-sm leading-[1.4] font-bold">Reservar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
