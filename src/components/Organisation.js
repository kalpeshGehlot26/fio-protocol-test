import React, { useState } from "react";

const Organisation = ({ setCurrentScreen }) => {
  const [org, setOrg] = useState("");

  const handleSave = () => {
    setCurrentScreen(3);
    localStorage.setItem("org", org);
  };

  return (
    <div className="mt-[-450px]">
      <div className=" flex justify-center text-white space-y-8 items-center flex-col w-full">
        <input
          type="text"
          className="org-input"
          placeholder="Enter Organisation"
          onChange={(e) => setOrg(e.target.value)}
        />
      </div>
      <div className="mx-auto text-center mt-[50px]">
        <button
          onClick={handleSave}
          className={`countinue-btn mx-auto hidden ${org ? "" : "!invisible"}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Organisation;
