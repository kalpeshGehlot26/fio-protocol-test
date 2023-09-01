import React, { useState } from "react";
import Header from "./components/Header";
import Organisation from "./components/Organisation";
import SelectMode from "./components/SelectMode";
import List from "./components/List";
import Final from "./components/Final";

const Screens = ({ currentScreen, ...rest }) => {
  const screenObj = {
    1: <SelectMode {...rest} />,
    2: <Organisation {...rest} />,
    3: <List {...rest} />,
    4: <Final {...rest} />,
  };

  if (screenObj[currentScreen]) {
    return screenObj[currentScreen];
  }
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const orgTitle = localStorage.getItem('orgTitle')

  const title = () => {
    if(currentScreen === 3) {
      return orgTitle
    }
    if(currentScreen === 4) {
      return 'Hang tight'
    }
    return 'FIO Wallet Demo'
  }

  return (
      <div className="container mx-auto ">
        <Header />
          <div
            className={`xl:ml-[115px]  ml-[10px] mt-8 z-10 relative return-btn ${currentScreen > 1 ? '' : "!invisible"}`}
            onClick={() => setCurrentScreen(currentScreen - 1)}
          >
            {`<- Return`}
          </div>

        <div className="!md:mt-[50px] mt-[20px]">
          <div className="md:text-[60px] text-[40px] heading">{title()}</div>
          <div className="sub-heading md:text-[22px] text-[18px]">
           {
            currentScreen === 4 ? '' : ' FIO wallet demo instruction selection content .. Can be up to two lines'
           }
          </div>
        </div>
        <div class="h-screen-minus-40 w-full grid place-items-center">
          <Screens
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        </div>
    </div>
  );
};

export default App;
