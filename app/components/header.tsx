import Image from "next/image";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-6">
      <Image src="/Trimly.svg" alt="Logo" width={100} height={26.09} />
      <Button variant="outline" size="icon">
        <Menu />
      </Button>
    </header>
  );
};

export default Header;
