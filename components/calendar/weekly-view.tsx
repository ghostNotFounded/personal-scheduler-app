const WeeklyView = () => {
  const iterations = 24;

  return (
    <div className="bg-neutral-200 p-10 border-t border-neutral-300 overflow-y-auto">
      <div className="py-2 flex items-center">
        <div className="flex flex-col items-center space-y-28">
          {Array.from({ length: iterations }, (_, index) => (
            <div key={index}>
              <p className="text-xs w-max">
                {(index + 1) % 12 ? (index + 1) % 12 : "12"}{" "}
                {index + 1 > 12 ? "pm" : "am"}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-10 w-full ml-10"></div>
      </div>
    </div>
  );
};

export default WeeklyView;
