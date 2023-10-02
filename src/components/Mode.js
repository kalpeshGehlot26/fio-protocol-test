import React, { useCallback, useState } from "react";




const Mode = ({ setCurrentScreen }) => {
  const [mode, setMode] = useState("");

  const handleMode = (e) => {
    setMode(e.target.value);
  };


  return (
    <div className="">
      <div className="flex justify-center text-white space-y-8 items-center flex-col w-full">
        <div className="flex p-4 px-6 md:w-[500px] w-full rounded-xl bg-[#262626] items-center justify-between">
          <div className="font-bold text-[20px] w-[200px]">Developer Mode</div>
          <div className="w-1/2 text-right">
            <label className="switch w-[123px] h-[60px]">
              <input
                type="checkbox"
                checked={mode === "dev"}
                name="dev"
                value="dev"
                onChange={handleMode}
              />
              <span className="slider slider-2-bg round" />
            </label>
          </div>
        </div>
        <div className="flex p-4 px-6 md:w-[500px] w-full rounded-xl bg-[#262626] items-center justify-between">
          <div className="font-bold text-[20px] w-[200px]">Live Mode</div>
          <div className="w-1/2 text-right">
            <label className="switch w-[123px] h-[60px]">
              <input
                type="checkbox"
                checked={mode === "live"}
                name="live"
                value="live"
                onChange={handleMode}
              />
              <span className="slider slider-2-bg round" />
            </label>
          </div>
        </div>
      </div>
      <div className="mx-auto text-center mt-[50px]">
        <button
          onClick={() => setCurrentScreen(2)}
          className={`countinue-btn mx-auto hidden ${mode ? "" : "!invisible"}`}
        >
          Continue
        </button>
      </div>

    </div>
  );
};

export default Mode;
