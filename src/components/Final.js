import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import Checked from "../assets/images/checked.svg";
// import PolygonLogo from "../assets/images/checked.svg";
import EthLogo from "../assets/images/ethereum-logo.jpg";
import PolygonLogo from "../assets/images/polygon.png";
import SolanaLogo from "../assets/images/solana-logo.png";
import FioLogo from "../assets/images/fiologo-1.png";

function TerminalLogs() {
  const [currentParagraphs, setCurrentParagraphs] = useState([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);

  const org = localStorage.getItem("org");
  const user = localStorage.getItem("user");

  const [data, setData] = useState({
    orgName: "",
    user: "",
  });

  useEffect(() => {
    setData({
      orgName: org,
      user: user,
    });
  }, [org, user]);

  const paragraphs = [
    {
      text: (vars) => `Registering domain name: ${vars.orgName}...`,
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
      text: (vars) => `Registering handle name ${vars.user}@${vars.orgName}...`,
      type: "heading",
      style: { color: "#252525", fontSize: "25px" },
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
          marginTop: 50,
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
          <img src={Checked} alt="Checked icon" />
        </span>
      ) : null;
    } else {
      return <div className="w-[34px]"></div>;
    }
  };

  return (
    <div className="!lg:mt-[-200px] lg:ml-32 mt-[-100px] px-6 lg:w-[700px]">
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
                {child?.text}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TerminalLogs;
