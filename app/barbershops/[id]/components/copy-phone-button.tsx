"use client";

import { Button } from "@/app/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyPhoneButtonProps {
  phone: string;
}

export function CopyPhoneButton({ phone }: CopyPhoneButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      toast.success("Telefone copiado!");
    } catch (error) {
      toast.error("Erro ao copiar telefone");
    }
  };

  return (
    <Button
      variant="outline"
      className="rounded-full px-4 py-2"
      onClick={handleCopy}
    >
      <span className="font-bold leading-[1.4] text-sm">Copiar</span>
    </Button>
  );
}

