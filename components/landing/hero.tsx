const Hero = () => {
  return (
    <main className="grid md:grid-cols-3 md:grid-rows-3 h-[calc(100vh-5rem)] gap-4 md:gap-6 lg:gap-8 xl:gap-10 py-4 md:py-6 lg:py-8 xl:py-10 px-2 md:px-10 lg:px-40 xl:px-80 text-sm md:text-md lg:text-lg xl:text-xl">
      <div className="grid-box rounded-xl text-purple-500 bg-stone-200 hover:scale-95 duration-300 ease-out">
        Welcome to Plannr
      </div>
      <div className="grid-box rounded-xl md:col-span-2 md:row-span-2 bg-purple-500 text-stone-200 hover:scale-95 duration-300 ease-out">
        Welcome to Plannr
      </div>
      <div className="grid-box rounded-xl md:row-span-2 bg-purple-500 text-stone-200 hover:scale-95 duration-300 ease-out">
        Welcome to Plannr
      </div>
      <div className="grid-box rounded-xl md:col-span-2 text-purple-500 bg-stone-200 hover:scale-95 duration-300 ease-out">
        Welcome to Plannr
      </div>
    </main>
  );
};

export default Hero;
