import React, { useEffect, useState } from "react";

const SignUp = ({ setCurrentScreen }) => {
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  // const _org = localStorage.getItem("org");
  // const _orgTitle = localStorage.getItem("orgTitle");

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSave = () => {
    if (mailformat.test(email)) {
      setCurrentScreen(3);
      localStorage.setItem("email", email);
    } else {
      setIsEmailValid(false);
    }
    // localStorage.setItem("orgTitle", orgTitle);
  };

  // useEffect(() => {
  //   if (_org) {
  //     setOrg(_org);
  //     setEmail(_orgTitle);
  //   }
  // }, [_org]);

  return (
    <div className="">
      <div className=" flex justify-center text-white space-y-8 items-center flex-col w-full">
        <label className="text-[#262626] font-bold">
          Email
          <input
            type="email"
            className="org-input font-normal"
            value={email}
            placeholder="Enter Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {!isEmailValid && (
          <span style={{ color: "red", display: "block", marginTop: "0px" }}>
            Invalid email address.
          </span>
        )}
      </div>
      

      <div className="mx-auto text-center mt-[50px]">
        <button
          onClick={handleSave}
          disabled={!email}
          className={`countinue-btn mx-auto hidden`}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
