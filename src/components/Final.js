import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import Checked from "../assets/images/checked.svg";

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
      text: (vars) => `Registering Domain Name: ${vars.orgName}..`,
      type: "heading",
      style: { color: "#252525", fontSize: "25px" },
    },
    {
      text: (vars) => `Minting Wallets for: ${vars.user}...`,
      type: "heading",
      style: { color: "#252525", fontSize: "25px" },
    },
    {
      text: (vars) => "EVM",
      style: { color: "#252525 ", fontSize: "20px", fontWeight: "bold" },
    },
    {
      text: (vars) => "Ox123s ... 223aSf ..",
      style: { color: "#252525", fontSize: "20px" },
    },
    { text: (vars) => "Sola..", style: { color: "#252525", fontSize: "20px" } },
    {
      text: (vars) => `Registering domain name ${vars.user}@${vars.orgName}...`,
      type: "heading",
      style: { color: "#252525", fontSize: "25px" },
    },
  ];

  useEffect(() => {
    const currentText = paragraphs[currentParagraphIndex]?.text(data);
    if (currentParagraphIndex < paragraphs.length && currentText) {
      if (currentCharIndex < currentText.length) {
        setTimeout(() => {
          const updatedParagraphs = [...currentParagraphs];
          if (updatedParagraphs[currentParagraphIndex]) {
            updatedParagraphs[currentParagraphIndex].text +=
              currentText[currentCharIndex];
          } else {
            updatedParagraphs[currentParagraphIndex] = {
              text: currentText[currentCharIndex],
              style: paragraphs[currentParagraphIndex].style,
              type: paragraphs[currentParagraphIndex].type,
            };
          }
          setCurrentParagraphs(updatedParagraphs);
          setCurrentCharIndex(currentCharIndex + 1);
        }, 50);
      } else {
        setCurrentCharIndex(0);
        setCurrentParagraphIndex(currentParagraphIndex + 1);
      }
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

  return (
    <div className="!lg:mt-[-300px] mt-[-150px] px-6">
      {currentParagraphs.map((paragraph, index) => (
        <div key={index} className="flex  space-x-2">
          {paragraph.type === "heading" && index < currentParagraphIndex ? (
            <span
              style={{
                ...getStyle(paragraph),
                marginTop: getStyle(paragraph)?.marginTop + 5,
              }}
            >
              <img src={Checked} />
            </span>
          ) : (
            <div className="w-[34px]"></div>
          )}
          <span style={getStyle(paragraph)}>{paragraph.text}</span>
          {index === currentParagraphIndex && <span></span>}
          <br />
        </div>
      ))}
    </div>
  );
}

export default TerminalLogs;
