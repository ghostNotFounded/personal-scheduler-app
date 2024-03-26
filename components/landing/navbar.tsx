import Button from "@/components/ui/space-button";

const Navbar = () => {
  return (
    <header className="h-20 flex items-center justify-between px-20">
      <div>
        <h6 className="text-2xl font-bold tracking-wider">
          Task<span className="text-purple-300">Tide</span>
        </h6>
        <p className="text-sm font-light italic">Master your Moments</p>
      </div>

      <Button href="/login">Get started</Button>
    </header>
  );
};

export default Navbar;
