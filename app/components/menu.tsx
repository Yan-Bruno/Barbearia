"use client";

import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { Home, CalendarDays, LogOut } from "lucide-react";

interface MenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Menu = ({ open, onOpenChange }: MenuProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await authClient.signOut();
    onOpenChange(false);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    onOpenChange(false);
  };

  const categories = [
    "Cabelo",
    "Barba",
    "Acabamento",
    "Sombrancelha",
    "Massagem",
    "Hidratação",
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[370px] p-0">
          <div className="flex h-full flex-col gap-6 bg-background px-0 py-6">
            {/* Header */}
            <SheetHeader className="px-5">
              <SheetTitle className="text-lg font-bold text-foreground">
                Menu
              </SheetTitle>
            </SheetHeader>

            <Separator />

            {/* User Section */}
            <div className="px-5">
              {session?.user ? (
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 rounded-full">
                    {session.user.image && (
                      <AvatarImage src={session.user.image} alt={session.user.name || ""} />
                    )}
                    <AvatarFallback>
                      {session.user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-base font-semibold leading-[1.4] text-foreground">
                      {session.user.name}
                    </p>
                    <p className="text-xs font-normal leading-[1.4] text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-base font-semibold leading-[1.4] text-foreground">
                      Olá. Faça seu login!
                    </p>
                  </div>
                  <Button
                    onClick={handleLogin}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col px-5">
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-3 rounded-[82px] px-5 py-3 text-left transition-colors hover:bg-muted"
              >
                <Home className="size-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Início
                </span>
              </button>
              <button
                onClick={() => handleNavigate("/bookings")}
                className="flex items-center gap-3 rounded-[82px] px-5 py-3 text-left transition-colors hover:bg-muted"
              >
                <CalendarDays className="size-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Agendamentos
                </span>
              </button>
            </div>

            <Separator />

            {/* Category Buttons */}
            <div className="flex flex-col gap-1 px-5">
              {categories.map((category) => (
                <button
                  key={category}
                  className="flex h-10 items-center rounded-[82px] px-5 py-3 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-sm font-medium text-foreground">
                    {category}
                  </span>
                </button>
              ))}
            </div>

            <Separator />

            {/* Logout Button */}
            <div className="px-5">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-[82px] px-5 py-3 text-left transition-colors hover:bg-muted"
              >
                <LogOut className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Sair da conta
                </span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
  );
};

export default Menu;

