import React, { useState, useEffect, useRef } from "react";
import Checked from "../assets/images/checked.svg";
// import PolygonLogo from "../assets/images/checked.svg";
import EthLogo from "../assets/images/ethereum-logo.jpg";
import PolygonLogo from "../assets/images/polygon.png";
import SolanaLogo from "../assets/images/solana-logo.png";
import FioLogo from "../assets/images/fiologo-1.png";
import WaxChain from "../assets/images/wax-chain-v.png";

function Diagnostics() {
  const [currentParagraphs, setCurrentParagraphs] = useState([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);

  const org = localStorage.getItem("domain");
  const user = localStorage.getItem("handle");

  const endOfLogsRef = useRef(null); // New ref for the end of logs

  const [data, setData] = useState({
    orgName: "",
    user: "",
  });

  useEffect(() => {
    setData({
      orgName: org?.toLowerCase(),
      user: user,
    });
  }, [org, user]);

  const paragraphs = [
    {
      text: (vars) => `Registering domain name: ${vars.orgName?.toLowerCase()}...`,
      type: "heading",
      style: { color: "#252525", fontSize: "22px" },
    },
    {
      text: (vars) => `Minting wallets for: ${vars.user}...`,
      type: "heading",
      style: { color: "#252525", fontSize: "22px" },
      children: [
        {
          text: () => "EVM:",
          style: { color: "#252525 ", fontSize: "16px", fontWeight: "bold" },
          icon: EthLogo,
        },
        {
          text: () => "0x10E0271ec47d55511a047516f2a7301801d55eaB",
          style: {
            color: "#252525",
            fontSize: "16px",
            marginLeft: "32px",
            marginBottom: "15px",
          },
        },
        {
          text: () => "Solana:",
          style: { color: "#252525", fontSize: "16px", fontWeight: "bold" },
          icon: SolanaLogo,
        },
        {
          text: () => "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
          style: {
            color: "#252525",
            fontSize: "16px",
            marginLeft: "32px",
            marginBottom: "15px",
          },
        },
        {
          text: () => "Polygon:",
          style: { color: "#252525", fontSize: "16px", fontWeight: "bold" },
          icon: PolygonLogo,
        },
        {
          text: () => "0xF2A1246e60a57c899DCD6e5166e246bc5cd7E783",
          style: {
            color: "#252525",
            fontSize: "16px",
            marginLeft: "32px",
            marginBottom: "15px",
          },
        },
        {
          text: () => "Wax:",
          style: { color: "#252525", fontSize: "16px", fontWeight: "bold" },
          icon: WaxChain,
        },
        {
          text: () => "0xdfdA12sdlfjhKdfdKNJdfNJ166e246bc5cd7E783",
          style: {
            color: "#252525",
            fontSize: "16px",
            marginLeft: "32px",
            marginBottom: "15px",
          },
        },
        {
          text: () => "Fio:",
          style: { color: "#252525", fontSize: "16px", fontWeight: "bold" },
          icon: FioLogo,
        },
        {
          text: () => "0xF2A1246e60a57c899DCD6e5166e246bc5cd7E783",
          style: { color: "#252525", fontSize: "16px", marginLeft: "32px" },
        },
      ],
    },
    {
      text: (vars) => `Registering handle name ${vars.user}@${vars.orgName?.toLowerCase()}...`,
      type: "heading",
      style: { color: "#252525", fontSize: "22px" },
    },
  ];

  const getCurrentText = () => {
    const parentParagraph = paragraphs[currentParagraphIndex];
    if (!parentParagraph) return "";

    const parentText = parentParagraph?.text(data);
    if (currentCharIndex < parentText?.length) {
      return parentText[currentCharIndex];
    }

    let totalChars = parentText?.length;
    for (let i = 0; i < parentParagraph?.children?.length; i++) {
      const child = parentParagraph?.children[i];
      if (currentCharIndex < totalChars + child?.text(data)?.length) {
        return child?.text(data)[currentCharIndex - totalChars];
      }
      totalChars += child?.text(data)?.length;
    }

    return "";
  };

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  useEffect(() => {
    const currentTextChar = getCurrentText();
    if (currentParagraphIndex < paragraphs?.length && currentTextChar) {
      setTimeout(() => {
        const updatedParagraphs = [...currentParagraphs];
        const parentParagraph = paragraphs[currentParagraphIndex];
        const parentText = parentParagraph?.text(data);

        if (currentCharIndex < parentText?.length) {
          // Append character to parent
          if (updatedParagraphs[currentParagraphIndex]) {
            updatedParagraphs[currentParagraphIndex].text += currentTextChar;
          } else {
            updatedParagraphs.push({
              ...parentParagraph,
              text: currentTextChar,
              children: [],
            });
          }
        } else {
          // Append character to one of the children
          let totalChars = parentText?.length;
          for (let i = 0; i < parentParagraph?.children?.length; i++) {
            const child = parentParagraph?.children?.[i];
            if (currentCharIndex < totalChars + child?.text(data).length) {
              if (!updatedParagraphs[currentParagraphIndex]?.children[i]) {
                updatedParagraphs[currentParagraphIndex].children[i] = {
                  ...child,
                  text: currentTextChar,
                };
              } else {
                updatedParagraphs[currentParagraphIndex].children[i].text +=
                  currentTextChar;
              }
              break;
            }
            totalChars += child?.text(data)?.length;
          }
        }

        setCurrentParagraphs(updatedParagraphs);
        setCurrentCharIndex(currentCharIndex + 1);
      }, 50);
    } else {
      setCurrentCharIndex(0);
      setCurrentParagraphIndex(currentParagraphIndex + 1);
    }
    if (endOfLogsRef.current && !isInViewport(endOfLogsRef.current)) {
      endOfLogsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    currentCharIndex,
    currentParagraphIndex,
    paragraphs,
    currentParagraphs,
    data,
  ]);

  const getStyle = (paragraph) => {
    switch (paragraph.type) {
      case "heading":
        return {
          fontSize: "0.8em",
          fontWeight: "bold",
          ...paragraph.style,
          marginTop: 40,
        };
      default:
        return paragraph.style;
    }
  };

  const getLoaderOrCheckedIcon = (paragraph, index) => {
    if (paragraph.type === "heading") {
      return index === currentParagraphIndex ? (
        <span
          style={{
            ...getStyle(paragraph),
            marginTop: getStyle(paragraph)?.marginTop + 5,
          }}
        >
          <span className="loader"></span>
        </span>
      ) : index < currentParagraphIndex ? (
        <span
          style={{
            ...getStyle(paragraph),
            marginTop: getStyle(paragraph)?.marginTop + 5,
          }}
        >
          <img
            src={Checked}
            alt="Checked icon"
            className="!w-8 !h-8"
            style={{ maxWidth: "none" }}
          />
        </span>
      ) : null;
    } else {
      return <div className="w-[34px]"></div>;
    }
  };

  return (
    <div className="px-6 mx-auto mb-22">
      {currentParagraphs.map((paragraph, index) => (
        <div key={index}>
          <div className="flex space-x-2">
            {getLoaderOrCheckedIcon(paragraph, index)}
            <span style={getStyle(paragraph)}>{paragraph?.text}</span>
          </div>
          {paragraph?.children?.map((child, childIndex) => (
            <div key={childIndex} className="flex space-x-2 ml-4">
              {getLoaderOrCheckedIcon(child, childIndex)}
              {child?.icon ? (
                <img
                  src={child?.icon}
                  className="w-4 h-4 mt-1 mix-blend-multiply	"
                />
              ) : null}
              <span
                className="w-[250px] inline-block break-words sm:w-full"
                style={getStyle(child)}
              >
                {child?.text?.toLowerCase()}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div ref={endOfLogsRef}></div>
    </div>
  );
}

export default Diagnostics;
