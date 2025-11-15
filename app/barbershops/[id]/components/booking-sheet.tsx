"use client";

import { useRef, useState } from "react";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import type { BarbershopService, Barbershop } from "@/generated/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: BarbershopService;
  barbershop: Barbershop;
}

export function BookingSheet({
  open,
  onOpenChange,
  service,
  barbershop,
}: BookingSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  const timeSlots: string[] = [];
  for (let hour = 9; hour <= 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 18) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    onOpenChange(false);
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    if (!isOpen) handleClose();
    else onOpenChange(isOpen);
  };

  const priceInReais = (service.priceInCents / 100)
    .toFixed(2)
    .replace(".", ",");

  const isConfirmEnabled = selectedDate && selectedTime;

  return (
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full w-[370px] flex-col p-0 sm:w-[370px]"
      >
        {/* 🔥 X FIXO IGUAL AO EXEMPLO */}
        <div className="bg-background sticky top-0 z-20 flex items-center justify-between px-5 py-6">
          <SheetHeader className="px-0">
            <SheetTitle className="text-foreground text-[18px] font-bold">
              Fazer Reserva
            </SheetTitle>
          </SheetHeader>

          {/* X FIXO */}
          <SheetClose className="text-xl font-bold">×</SheetClose>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 pb-6">
          <Separator />

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const d = new Date(date);
              d.setHours(0, 0, 0, 0);
              return d < today;
            }}
            className="w-full rounded-md border"
            locale={ptBR}
          />

          <Separator />

          {/* 🔥 SCROLL NATURAL NOS HORÁRIOS + SNAP */}
          {selectedDate && (
            <div>
              <div
                ref={scrollRef}
                className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 whitespace-nowrap"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollBehavior: "smooth",
                }}
              >
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                    className="snap-center rounded-full px-4 py-2 text-sm whitespace-nowrap"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <>
              <Separator />

              <div className="flex flex-col items-center gap-2.5">
                <div className="bg-card border-border w-[330px] rounded-[10px] border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold">{service.name}</p>
                    <p className="text-sm font-bold">R$ {priceInReais}</p>
                  </div>

                  <div className="text-muted-foreground flex justify-between text-sm">
                    <p>Data</p>
                    <p>
                      {format(selectedDate, "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>

                  <div className="text-muted-foreground flex justify-between text-sm">
                    <p>Horário</p>
                    <p>{selectedTime}</p>
                  </div>

                  <div className="text-muted-foreground flex justify-between text-sm">
                    <p>Barbearia</p>
                    <p>{barbershop.name}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {isConfirmEnabled && (
          <div className="bg-background border-t p-5">
            <Button className="w-full rounded-full py-2 text-sm font-bold">
              Confirmar
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
