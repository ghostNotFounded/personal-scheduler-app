const WeeklyView = () => {
  const iterations = 24;

  return (
    <div className="relative bg-neutral-200 p-10 border-t border-neutral-300 overflow-y-auto">
      <div className="">
        <div className="space-y-28 min-w-full ">
          {Array.from({ length: iterations }, (_, index) => (
            <div key={index} className="flex items-center space-x-10">
              <p className="text-xs min-w-max">
                {(index + 1) % 12 ? (index + 1) % 12 : "12"}{" "}
                {index + 1 > 12 ? "pm" : "am"}
              </p>
              <hr className="h-[2px] w-full bg-neutral-300 border-0 rounded" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-10 w-full ml-10"></div>
      </div>
    </div>
  );
};

export default WeeklyView;
