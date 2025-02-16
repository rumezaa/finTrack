import React, { useState, useEffect } from "react";
import Ball from "./Ball";
import Platform from "./Platform";
import StartMenu from "./StartMenu";
import HelpMenu from "./HelpMenu";
import GameOver from "./GameOver";

const Game: React.FC = () => {
  const [position, setPosition] = useState<number>(0);
  const [xPosition, setXPosition] = useState<number>(
    Math.random() * (window.innerWidth - 50)
  );
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [platformX, setPlatformX] = useState<number>(
    window.innerWidth / 2 - 50
  );
  const [catchCount, setCatchCount] = useState<number>(0);
  const [platformSpeed, setPlatformSpeed] = useState<number>(30);
  const [score, setScore] = useState<number>(0);
  const [squirrelSize, setSquirrelSize] = useState<number>(1);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    const interval = setInterval(() => {
      setPosition((prevPosition) => prevPosition + 5);
    }, 16);

    return () => clearInterval(interval);
  }, [isGameStarted, isGameOver]);

  const handleCatch = () => {
    setPosition(0);
    setXPosition(Math.random() * (window.innerWidth - 50));
    setCatchCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 2) {
        setSquirrelSize((prevSize) => Math.max(0.5, prevSize - 0.1));
        setCatchCount(0);
      }
      return newCount;
    });
    setScore((prevScore) => prevScore + 1);
  };

  const handleMiss = () => {
    setIsGameOver(true);
  };

  const resetGame = () => {
    setPosition(0);
    setXPosition(Math.random() * (window.innerWidth - 50));
    setIsGameOver(false);
    setCatchCount(0);
    setPlatformSpeed(30);
    setScore(0);
    setSquirrelSize(1);
  };

  return (
    <div className="relative w-screen h-screen bg-gray-100 flex justify-center items-center">
      {!isGameStarted && <HelpMenu msg = {"Start"} onStart={() => setIsGameStarted(true)} />}
      {isGameStarted && (
        <>
          <Ball
            position={position}
            xPosition={xPosition}
            platformX={platformX}
            onMiss={handleMiss}
            onCatch={handleCatch}
          />
          <Platform
            setPlatformX={setPlatformX}
            platformSpeed={platformSpeed}
            squirrelSize={squirrelSize}
          />
          <div className="absolute top-5 left-5 text-xl text-red-600 font-bold">
            Score: {score}
          </div>
          {isGameOver && (
            <GameOver onRestart={resetGame} onShowHelp={() => setShowHelp(true)} />
          )}
        </>
      )}
      {showHelp && <HelpMenu msg = {"Close"} onStart={() => setShowHelp(false)} />}
    </div>
  );
};

export default Game;
