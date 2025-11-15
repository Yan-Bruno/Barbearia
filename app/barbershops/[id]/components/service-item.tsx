"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";

import { BookingSheet } from "./booking-sheet";
import type { BarbershopService, Barbershop } from "@/generated/prisma";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const [bookingSheetOpen, setBookingSheetOpen] = useState(false);

  const priceInReais = (service.priceInCents / 100)
    .toFixed(2)
    .replace(".", ",");

  return (
    <>
      <div className="bg-card border-border flex w-full items-center gap-3 rounded-2xl border p-3">
        <div className="relative size-[110px] shrink-0 rounded-[10px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            sizes="110px"
            className="rounded-[10px] object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1 text-sm leading-[1.4]">
            <p className="text-card-foreground font-bold">{service.name}</p>
            <p className="text-muted-foreground">{service.description}</p>
          </div>

          <div className="flex w-full items-center justify-between">
            <p className="text-card-foreground text-sm font-bold">
              R$ {priceInReais}
            </p>

            <Button
              variant="default"
              className="rounded-full px-4 py-2"
              onClick={() => setBookingSheetOpen(true)}
            >
              <span className="text-sm font-bold">Reservar</span>
            </Button>
          </div>
        </div>
      </div>

      <BookingSheet
        open={bookingSheetOpen}
        onOpenChange={setBookingSheetOpen}
        service={service}
        barbershop={barbershop}
      />
    </>
  );
}
