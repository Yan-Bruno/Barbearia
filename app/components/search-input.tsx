import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Pesquise serviços ou barbearias"
        className="rounded-full border border-solid border-black/8"
      />
      <Button variant="default" size="icon" className="rounded-full">
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
