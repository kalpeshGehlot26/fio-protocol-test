import { useSpring, animated, useTrail } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import edit from "../assets/images/editMode.svg";

const List = ({ setCurrentScreen }) => {
  const [items, setItems] = useState([
    "",
    "Ox123s ... 223aSf",
    "Abeog$/",
    "EOS23056t",
  ]);
  const org = localStorage.getItem("org");
  const _user = localStorage.getItem("user");

  const [currentOrg, setCurrentOrg] = useState("");

  useEffect(() => {
    setCurrentOrg(org);
  }, [org]);

  useEffect(() => {
    if(_user) {
      const arr = [...items];
      arr[0] = _user;
      setItems(arr);
    }
  }, [_user])

  const handleSave = () => {
    setCurrentScreen(4);
    localStorage.setItem("user", items[0]);
  };

  const animations = useTrail(items.length, {
    transform: items[0]?.length > 3 ? "translateY(0px)" : "translateY(100px)",
    opacity: items[0]?.length > 3 ? 1 : 0,
    from: { transform: "translateY(100px)" },
    trail: 200,
  });

  console.log(items)

  return (
    <div className="mt-[-40px]">
      <div className="flex justify-center space-y-8 items-center flex-col w-full font-Comfortaa">
        <div className="mx-auto relative mt-[-120px] ">
          <input
            placeholder="naga@metakeep.xyz"
            value={items[0]}
            className="input-domain"
            onChange={(e) => {
              const arr = [...items];
              arr[0] = e.target.value;
              setItems(arr);
            }}
          />
          <span className="return-btn absolute top-[30%] right-2">{`->`}</span>
        </div>

        <div className="space-y-4">
          {animations.map((props, index) => (
            <animated.div
              key={index}
              className="flex p-4 px-6 w-[345px] h-[54px] rounded-xl bg-[#262626] items-center justify-between"
              style={{
                ...props,
              }}
            >
              <div className="font-bold text-[16px] text-white">
                {index === 0 ? `${items[0]}@${currentOrg}` : items[index]}
              </div>
              <div className="w-1/2 text-right" onClick={() => {
                const arr = [...items];
                arr[0] = items[index]
                setItems(arr);
              }}>
                <img className="w-[28px] ml-4 inline" src={edit} />
              </div>
            </animated.div>
          ))}
        </div>

        <div>
          {items[0]?.length > 3 ? (
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
