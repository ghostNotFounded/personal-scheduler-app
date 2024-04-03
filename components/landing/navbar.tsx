import Button from "@/components/ui/space-button";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="h-20 flex items-center justify-between px-2 md:px-10 lg:px-40 xl:px-80">
      <div className="flex items-center space-x-2 cursor-default">
        <Image src={"/Logo.svg"} width={25} height={25} alt="logo" />
        <h6 className="text-xl font-semibold tracking-wider">Plannr</h6>
      </div>

      <Button href="/login">Get started</Button>
    </header>
  );
};

export default Navbar;
