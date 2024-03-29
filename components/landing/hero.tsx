const Hero = () => {
  return (
    <main className="grid grid-cols-3 grid-rows-3 h-[calc(100vh-5rem)] gap-10 py-10 px-80">
      <div className="grid-box rounded-xl text-purple-500 bg-stone-200">
        Hello
      </div>
      <div className="grid-box rounded-xl col-span-2 row-span-2 bg-purple-500 text-stone-200">
        Hello
      </div>
      <div className="grid-box rounded-xl row-span-2 bg-purple-500 text-stone-200">
        Hello
      </div>
      <div className="grid-box rounded-xl col-span-2 text-purple-500 bg-stone-200">
        Hello
      </div>
    </main>
  );
};

export default Hero;
