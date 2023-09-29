import React, { useEffect, useState } from "react";

const Organisation = ({ setCurrentScreen }) => {
  const [org, setOrg] = useState("");
  const [orgTitle, setOrgTitle] = useState("");
  const _org = localStorage.getItem("org");
  const _orgTitle = localStorage.getItem("orgTitle");

  const handleSave = () => {
    setCurrentScreen(4);
    localStorage.setItem("org", org);
    localStorage.setItem("orgTitle", orgTitle);
  };

  useEffect(() => {
    if (_org) {
      setOrg(_org);
      setOrgTitle(_orgTitle);
    }
  }, [_org]);

  return (
    <div className="">
      <div className=" flex justify-center text-white space-y-8 items-center flex-col w-full">
        <label className="text-[#262626] font-bold">
          Handle
          <input
            type="text"
            className="org-input font-normal"
            value={orgTitle}
            placeholder="Enter Handle Name"
            onChange={(e) => setOrgTitle(e.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-center mt-8 text-white space-y-8 items-center flex-col w-full">
        <label className="text-[#262626] font-bold">
          Domain
          <input
            type="text"
            className="org-input font-normal"
            value={org}
            placeholder="Enter Domain Name"
            onChange={(e) => setOrg(e.target.value)}
          />
        </label>
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
