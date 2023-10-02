import React, { useState } from "react";
import Header from "./components/Header";
import Domain from "./components/Domain";
import Mode from "./components/Mode";
import RegisterHandle from "./components/RegisterHandle";
import Diagnostics from "./components/Diagnostics";
import SignUp from "./components/Signup";

const Screens = ({ currentScreen, ...rest }) => {
  const screenObj = {
    1: <Mode {...rest} />,
    2: <SignUp {...rest}/>,
    3: <Domain {...rest} />,
    4: <RegisterHandle {...rest} />,
    5: <Diagnostics {...rest} />,
  };

  if (screenObj[currentScreen]) {
    return screenObj[currentScreen];
  }
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const orgTitle = localStorage.getItem('domain')

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
