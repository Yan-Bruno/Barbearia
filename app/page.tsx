import Header from "./components/header";
import SearchInput from "./components/search-input";
import Image from "next/image";
import banner from "@/public/banner.png";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="space-y-4 px-5">
        <SearchInput />
        <Image
          src={banner}
          alt="banner"
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};

export default Home;
