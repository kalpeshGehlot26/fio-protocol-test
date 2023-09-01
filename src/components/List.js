import { useSpring, animated, useTrail } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";
import Checked from "../assets/images/checked.svg";
import edit from "../assets/images/editMode.svg";
import EthLogo from "../assets/images/ethereum-logo.jpg";
import PolygonLogo from "../assets/images/polygon.png";
import SolanaLogo from "../assets/images/solana-logo.png";
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
  const org = localStorage.getItem("org");
  const _user = localStorage.getItem("user");
  const _email = localStorage.getItem("userName");

  const [currentOrg, setCurrentOrg] = useState("");

  const initialSentences = ["", "Ox123 ... s223aS", "Abeog$/", "EOS23056t"];
  const walletIcons = [EthLogo, PolygonLogo, EOSLogo, ]

  const [sentences, setSentences] = useState(initialSentences);
  const [userHandle, setUserHandle] = useState("");
  const [loadedSentences, setLoadedSentences] = useState([]);

  const debounceSearch = useDebounce(email, 800);

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    if (mailformat.test(debounceSearch)) {
      const _userHandle = debounceSearch?.split("@")?.[0];
      setUserHandle(_userHandle);
      sentences.forEach((_, index) => {
        setTimeout(() => {
          setLoadedSentences((prevState) => [...prevState, index]);
        }, (index + 1) * 5000);
      });
    }
  }, [sentences, debounceSearch]);

  useEffect(() => {
    setCurrentOrg(org);
  }, [org]);

  useEffect(() => {
    if (_user) {
      setUserHandle(_user);
    }
    if (_email) {
      setEmail(_email);
    }
  }, [_user, _email]);

  const handleSave = () => {
    setCurrentScreen(4);
    localStorage.setItem("user", `${userHandle}`);
    localStorage.setItem("userName", email);
  };

  const handleInputChange = (e) => {
    setUserHandle(e.target.value);
  };

  const inputRef = useRef(null);

  return (
    <div className="mt-[-40px]">
      <div className="flex justify-center space-y-8 items-center flex-col w-full font-Comfortaa">
        <div className="mx-auto relative mt-[-120px] ">
          <input
            placeholder="naga@metakeep.xyz"
            value={email}
            className="input-domain"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="return-btn absolute top-[30%] right-2">{`->`}</span>
        </div>

        <div className="min-h-[200px] w-full">
          {debounceSearch?.length > 3 && mailformat.test(debounceSearch) ? (
            <div className="App font-Inter">
              <div className="w-full text-center ">
                <div className="sentence-first mb-8 mx-auto">
                  {loadedSentences.includes(0) ? (
                    <img
                      src={Checked}
                      className="w-4 mr-2"
                      alt="Checked icon"
                    />
                  ) : (
                    <div className="loader-org w-2 mt-1 mr-2"></div>
                  )}
                  {!loadedSentences.includes(0) ? (
                    <div className="editableSentence">{`${userHandle}@${currentOrg}`}</div>
                  ) : (
                    <>
                      <input
                        ref={inputRef}
                        value={userHandle}
                        onChange={handleInputChange}
                        className="editableSentence"
                        style={{ width: `${userHandle?.length - 1}ch` }}
                        disabled={!loadedSentences?.includes(0)}
                      />
                      <div className="editableSentence">{`@${currentOrg}`}</div>
                    </>
                  )}
                </div>
              </div>
              {sentences.slice(1).map((sentence, index) => (
                <div key={index} className="sentence my-2 text-[18px]">
                  {loadedSentences.includes(index + 1) ? (
                    <img src={Checked} className="w-4" alt="Checked icon" />
                  ) : (
                    <div className="loader-org w-2"></div>
                  )}
                  <img src={walletIcons[index]} className="w-4 h-4 mix-blend-multiply	" /> 
                  {sentence}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* <div className="space-y-4">
          {animations.map((props, index) => {
            const userHandle = items[0]?.split('@')?.[0];
            return (
              <animated.div
                key={index}
                className="flex p-4 px-6 w-[345px] h-[54px] rounded-xl bg-[#262626] items-center justify-between"
                style={{
                  ...props,
                }}
              >
                <div className="font-bold text-[16px] text-white">
                  {index === 0 ? `${userHandle}@${currentOrg}` : items[index]}
                </div>
                <div
                  className="w-1/2 text-right"
                  onClick={() => {
                    const arr = [...items];
                    arr[0] = items[index];
                    setItems(arr);
                  }}
                >
                  <img className="w-[28px] ml-4 inline" src={edit} />
                </div>
              </animated.div>
            );
          })}
        </div> */}

        <div>
          {debounceSearch?.length > 3 && mailformat.test(debounceSearch) && loadedSentences?.length === sentences?.length ? (
            <button
              onClick={handleSave}
              className={`countinue-btn mx-auto hidden`}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default List;
