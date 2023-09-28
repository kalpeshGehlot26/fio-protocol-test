import React, { useState } from "react";
import Header from "./components/Header";
import Organisation from "./components/Organisation";
import SelectMode from "./components/SelectMode";
import List from "./components/List";
import Final from "./components/Final";
import SignUp from "./components/Signup";

const Screens = ({ currentScreen, ...rest }) => {
  const screenObj = {
    1: <SelectMode {...rest} />,
    2: <SignUp {...rest}/>,
    3: <Organisation {...rest} />,
    4: <List {...rest} />,
    5: <Final {...rest} />,
  };

  if (screenObj[currentScreen]) {
    return screenObj[currentScreen];
  }
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const orgTitle = localStorage.getItem('orgTitle')

  const title = () => {
    if(currentScreen === 4) {
      return `${orgTitle} Wallet`
    }
    if(currentScreen === 5) {
      return `${orgTitle} Wallet: Diagnostics`
    }
    return 'FIO Wallet Demo'
  }

  return (
      <div className="container mx-auto ">
        <Header />
          <div
            className={`xl:ml-[115px]  ml-[10px] mt-8 z-1 cursor-pointer relative return-btn ${currentScreen > 1 ? '' : "!invisible"}`}
            onClick={() => setCurrentScreen(currentScreen - 1)}
          >
            {`<- Return`}
          </div>

        <div className="!md:mt-[50px] mt-[20px]">
          <div className="md:text-[60px] text-[40px] heading">{title()}</div>
          <div className="sub-heading md:text-[22px] text-[18px]">
           {
            currentScreen === 4 ? '' : ' FIO wallet demo instruction selection content'
           }
          </div>
        </div>
        <div class={` w-full grid xl:mt-[100px] px-4 ${currentScreen !== 4 ? 'mt-[50px]' : 'mt-0'}`}>
          <Screens
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        </div>
    </div>
  );
};

export default App;
