import React, { useEffect, useState } from "react";

type PlatformProps = {
  setPlatformX: (x: number) => void;
  platformSpeed: number;
  squirrelSize: number; // New prop to track squirrel size
}

const Platform: React.FC<PlatformProps> = (props: PlatformProps) => {
    const { setPlatformX, platformSpeed, squirrelSize } = props;

  const squirrelWidth = 150 * squirrelSize; // Adjust width based on squirrel size
  const [platformPosX, setPlatformPosX] = useState<number>(window.innerWidth / 2 - squirrelWidth / 2); // Center squirrel on screen

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setPlatformPosX((prevPosX) => Math.max(prevPosX - platformSpeed, 0)); // Prevent going off-screen
      } else if (event.key === "ArrowRight") {
        setPlatformPosX((prevPosX) => Math.min(prevPosX + platformSpeed, window.innerWidth - squirrelWidth)); // Prevent going off-screen
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [platformSpeed, squirrelWidth]);

  useEffect(() => {
    setPlatformX(platformPosX);
  }, [platformPosX, setPlatformX]);

  return (
    <div
      className="absolute bottom-0"
      style={{
        left: platformPosX,
      }}
    >
      {/* Larger Squirrel SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width={squirrelWidth} height={150 * squirrelSize}>
        <g fill="#8B4513">
          {/* Tail of the squirrel */}
          <path
            d="M90,70 C120,50 150,100 75,100 C60,115 45,85 60,75 C75,70 90,70 90,70"
            fill="#A0522D"
          />
          {/* Squirrel Body */}
          <circle cx="75" cy="80" r="35" fill="#8B4513" />
          {/* Squirrel Ears */}
          <circle cx="60" cy="65" r="8" fill="#8B4513" />
          <circle cx="90" cy="65" r="8" fill="#8B4513" />
          {/* Squirrel Eyes */}
          <circle cx="70" cy="75" r="5" fill="black" />
          <circle cx="85" cy="75" r="5" fill="black" />
          {/* Squirrel Nose */}
          <circle cx="75" cy="85" r="3" fill="black" />
          {/* Squirrel Legs */}
          <circle cx="60" cy="100" r="8" fill="#8B4513" />
          <circle cx="90" cy="100" r="8" fill="#8B4513" />
        </g>
      </svg>
    </div>
  );
};

export default Platform;
