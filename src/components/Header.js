import React, { useCallback, useState } from "react";
import logo from "../assets/images/fiologo.png";

const changeAnchor = (anchor, classes) => {
  switch (anchor) {
    case "left":
      return classes.left;
    case "right":
      return classes.right;
    default:
      return classes.left;
  }
};

const Drawer = (props) => {
  const { open, anchor, onClose } = props;
  return (
    <>
      <div
        className={`z-9 ${"overlay"} ${!open && "overlayHidden"} ${
          open && "overlayOpen"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        tabIndex="-1"
        className={`drawer ${open && "animate"} ${
          !open && "drawer-hidden"
        } right`}
      >
        <div className={"header"}>
          <img
            src={logo}
            className="my-[24px] w-[70px] ml-[30px]"
          />
        </div>
        <div className="text-white font-Comfortaa px-10 mt-10 h-full w-full justify-center items-center space-y-14">
          <div className="text-[20px] xl:text-[30px] text-black">About</div>
          <div className="text-[20px] xl:text-[30px] text-black">Learn</div>
          <div className="text-[20px] xl:text-[30px] text-black">Integrate</div>
          <div className="text-[20px] xl:text-[30px] text-black">Community</div>
        </div>
      </div>
    </>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className="w-full px-2 md:px-0">
      <div className="h-[120px] flex justify-between items-center">
        <div className="lg:w-1/2 w-1/3">
          <img
            src={logo}
            className="my-[24px] w-[100px] xl:ml-[120px] ml-[0px]"
          />
        </div>
        <div className="lg:w-1/2 hidden w-0 md:block">
          <div className="text-white font-Comfortaa flex h-full w-full justify-center items-center space-x-14">
            <div className="text-[20px] xl:text-[30px] text-black">About</div>
            <div className="text-[20px] xl:text-[30px] text-black">Learn</div>
            <div className="text-[20px] xl:text-[30px] text-black">
              Integrate
            </div>
            <div className="text-[20px] xl:text-[30px] text-black">
              Community
            </div>
          </div>
        </div>
        <div className="md:collapse visible" onClick={handleOpen}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M4 18L20 18"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              ></path>
              <path
                d="M4 12L20 12"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              ></path>
              <path
                d="M4 6L20 6"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <Drawer anchor="right" open={open} onClose={handleClose} />
    </div>
  );
};

export default Header;
