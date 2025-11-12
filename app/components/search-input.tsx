import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Search"
        className="rounded-full border border-solid border-black/8"
      />
      <Button variant="outline" size="icon" className="rounded-full">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
