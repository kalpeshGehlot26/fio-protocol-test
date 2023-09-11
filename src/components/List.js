import React, { useEffect, useRef, useState } from "react";
import Checked from "../assets/images/checked.svg";
import EthLogo from "../assets/images/ethereum-logo.jpg";
import PolygonLogo from "../assets/images/polygon.png";
import EOSLogo from "../assets/images/eos-coin.png";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const List = ({ setCurrentScreen }) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentOrg, setCurrentOrg] = useState("");
  const [displayedChars, setDisplayedChars] = useState([]);

  const org = localStorage.getItem("org");
  const _user = localStorage.getItem("user");
  const _email = localStorage.getItem("userName");

  const initialSentences = [
    "Wallets",
    "0x10E0271ec47d55511a047516f2a7301801d55eaB",
    "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe",
    "0xF2A1246e60a57c899DCD6e5166e246bc5cd7",
  ];
  const walletIcons = ["", EthLogo, PolygonLogo, EOSLogo];

  const [sentences, setSentences] = useState(initialSentences);
  const [userHandle, setUserHandle] = useState("");
  const [loadedSentences, setLoadedSentences] = useState([]);

  const [walletLoading, setWalletLoading] = useState(false);

  const [domainLoading, setDomainLoading] = useState(false);

  const debounceSearch = useDebounce(email, 800);
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const currentSentenceRef = useRef(null);


  useEffect(() => {
    setCurrentOrg(org);
  }, [org]);

  useEffect(() => {
    if (_user) {
      setUserHandle(_user);
      setStartAnimation(true);
    }
    if (_email) {
      setEmail(_email);
    }
  }, [_user, _email]);

  const handleInputChange = (e) => {
    setUserHandle(e.target.value);
  };

  const handleStartAnimation = () => {
    if (mailformat.test(email)) {
      setIsEmailValid(true);
      setStartAnimation(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const isElementOutOfView = (el) => {
    const rect = el.getBoundingClientRect();
    return (rect.bottom > window.innerHeight);
};




  useEffect(() => {
    if (!startAnimation) return;

    setWalletLoading(true);

    const typeSentence = (sentence, index) => {
      let charCount = 0;

      setWalletLoading(true);
      setDomainLoading(true);

      const typeInterval = setInterval(() => {
        setDisplayedChars((prevChars) => {
          const newChars = [...prevChars];
          newChars[index] = sentence.substring(0, charCount);
          return newChars;
        });


        charCount++;

       
        if (charCount > sentence.length) {
          clearInterval(typeInterval);
          setWalletLoading(false);
          setDomainLoading(false);
          setLoadedSentences((prevState) => [...prevState, index]);

          if (index < sentences.length) {
            typeSentence(sentences[index], index + 1);
          }

          if (currentSentenceRef.current && isElementOutOfView(currentSentenceRef.current)) {
            currentSentenceRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        }
      }, 20);
    };

    if (mailformat.test(debounceSearch)) {
      const _userHandle = debounceSearch?.split("@")?.[0];
      setUserHandle(_userHandle);
      typeSentence(`${_userHandle}@${currentOrg}`, 0);
    }
  }, [sentences, debounceSearch, currentOrg, startAnimation]);

  const handleSave = () => {
    setCurrentScreen(4);
    localStorage.setItem("user", `${userHandle}`);
    localStorage.setItem("userName", email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setStartAnimation(false);
    setLoadedSentences([]);
    setDisplayedChars([]);
  };

  const handleUpdateDomain = () => {
    setDomainLoading(true);
    setTimeout(() => {
      setDomainLoading(false);
    }, 1000);
    setStartAnimation(true);
  };

  const spanRef = useRef(null);

  const inputWidth = spanRef.current
    ? spanRef.current.offsetWidth + 10
    : "auto";

  return (
    <div className="">
      <div className="flex justify-center space-y-8 items-center flex-col w-full font-Comfortaa">
        <div className="mx-auto relative">
          <input
            placeholder="dave@metakeep.xyz"
            value={email}
            className="input-domain"
            onChange={handleEmailChange}
          />
          <span
            className="return-btn cursor-pointer absolute top-[30%] right-2"
            onClick={handleStartAnimation}
          >{`->`}</span>
        </div>
        {!isEmailValid && (
          <span style={{ color: "red", display: "block", marginTop: "0px" }}>
            Invalid email address.
          </span>
        )}

        <div className="min-h-[200px] w-[350px] sm:w-[450px] mx-auto ">
          <div className="flex w-full xl:[420px] text-xl font-semibold break-words">
            {loadedSentences.includes(0) && !domainLoading ? (
              <img src={Checked} className="w-4 mr-2" alt="Checked icon" />
            ) : startAnimation ? (
              <div className="loader-org w-2 mt-1 mr-2"></div>
            ) : null}
            {startAnimation ? (
              <div className="text-xl font-semibold">User Handle</div>
            ) : null}
          </div>

          {debounceSearch?.length > 3 &&
          mailformat.test(debounceSearch) &&
          startAnimation ? (
            <div className="App font-Inter">
              <div className="w-full text-center ">
                <div className="sentence-first mb-8 mx-auto">
                  {loadedSentences.includes(0) ? (
                    <>
                      <div style={{ position: "relative" }}>
                        <input
                          value={userHandle}
                          onChange={handleInputChange}
                          className="editableSentence p-0"
                          style={{ width: inputWidth }}
                          disabled={!loadedSentences?.includes(0)}
                          onBlur={() => handleUpdateDomain()}
                        />
                        <span
                          ref={spanRef}
                          style={{
                            position: "absolute",
                            top: -9999,
                            left: -9999,
                            whiteSpace: "pre",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            letterSpacing: "inherit",
                          }}
                        >
                          {userHandle}
                        </span>
                      </div>
                      <div className="editableSentence ml-[-2px]">{`@${currentOrg}`}</div>
                    </>
                  ) : (
                    <div className="editableSentence">
                      {displayedChars[0]?.toLowerCase() || ""}
                    </div>
                  )}
                </div>
              </div>
              {loadedSentences.includes(0) &&
                sentences.map((sentence, index) => {
                  if (index === 0) {
                    return (
                      <div className="flex w-[380px] text-xl font-semibold break-words">
                        {walletLoading ? (
                          <div className="loader-org w-2 mt-1 mr-2"></div>
                        ) : (
                          <img
                            src={Checked}
                            className="w-4 mr-2"
                            alt="Checked icon"
                          />
                        )}
                        {displayedChars[index + 1] || ""}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={index}
                      ref={currentSentenceRef}
                      className="sentence my-2 mr-[-3rem] text-[17px]"
                    >
                      {(index === 0 || loadedSentences?.includes(index)) && (
                        <img
                          src={walletIcons[index]}
                          className="w-4 h-4 mix-blend-multiply mt-[4px]"
                        />
                      )}
                      <div className="inline-block w-[300px] md:w-[420px] break-words">
                        {displayedChars[index + 1]?.toLowerCase() || ""}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : null}
        </div>

        <div>
          {debounceSearch?.length > 3 &&
          mailformat.test(debounceSearch) &&
          loadedSentences?.length >= sentences?.length + 1 ? (
            <button
              onClick={handleSave}
              className={`countinue-btn mx-auto hidden`}
            >
              Diagnostics
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default List;
