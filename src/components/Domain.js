import React, { useState } from "react";

const Domain = ({ setCurrentScreen }) => {
  const [domain, setDomain] = useState("");
  const [handleName, setHandleName] = useState("");

  const handleSave = () => {
    setCurrentScreen(4);
    localStorage.setItem("domain", domain);
    localStorage.setItem("handle", handleName);
  };

  return (
    <div className="">
     
      <div className="flex justify-center  text-white space-y-8 items-center flex-col w-full">
        <label className="text-[#262626] font-bold">
          Domain
          <input
            type="text"
            className="org-input font-normal"
            value={domain}
            placeholder="Enter Domain Name"
            onChange={(e) => setDomain(e.target.value)}
          />
        </label>
      </div>
      <div className=" flex justify-center mt-8 text-white space-y-8 items-center flex-col w-full">
        <label className="text-[#262626] font-bold">
          Handle
          <input
            type="text"
            className="org-input font-normal"
            value={handleName}
            placeholder="Enter Handle Name"
            onChange={(e) => setHandleName(e.target.value)}
          />
        </label>
      </div>
      <div className="mx-auto text-center mt-[50px]">
        <button
          onClick={handleSave}
          className={`countinue-btn mx-auto hidden`}
          disabled={!domain || !handleName}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Domain;
