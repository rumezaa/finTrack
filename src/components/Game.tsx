import React, { useEffect, useState } from "react";
import Ball from "./Ball";
import Platform from "./Platform";
import HelpMenu from "./HelpMenu";
import GameOver from "./GameOver";

const Game: React.FC = () => {
  const [position, setPosition] = useState<number>(0);
  const [xPosition, setXPosition] = useState<number>(Math.random() * (window.innerWidth - 50));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [platformX, setPlatformX] = useState<number>(window.innerWidth / 2 - 50);
  const [catchCount, setCatchCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [squirrelSize, setSquirrelSize] = useState<number>(1);
  const [acornSpeed, setAcornSpeed] = useState<number>(5);
  const [acornCount, setAcornCount] = useState<number>(0); // Track acorns caught
  const [showExitButton, setShowExitButton] = useState<boolean>(false); // Whether to show exit button

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    const interval = setInterval(() => {
      setPosition((prevPosition) => prevPosition + acornSpeed);
    }, 16);

    return () => clearInterval(interval);
  }, [isGameStarted, isGameOver, acornSpeed]);

  const handleCatch = () => {
    setPosition(0);
    setXPosition(Math.random() * (window.innerWidth - 50));
    setCatchCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 2) {
        setSquirrelSize((prevSize) => Math.max(0.5, prevSize - 0.1)); // Shrink squirrel
        setCatchCount(0); // Reset catch count
      }
      if (newCount === 4) {
        setAcornSpeed((prevSpeed) => prevSpeed + 1); // Increase speed every 4 acorns
        setCatchCount(0); // Reset catch count
      }
      return newCount;
    });

    setScore((prevScore) => prevScore + 1);
    setAcornCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 50) {
        setShowExitButton(true); // Show exit button after 10 acorns
      }
      return newCount;
    });
  };

  const handleMiss = () => {
    setIsGameOver(true);
  };

  const handleExit = () => {
    // Add logic to handle exit (either reset or navigate away)
    console.log("Exiting game...");
    setIsGameStarted(false);
    setIsGameOver(false);
    setScore(0);
    setAcornCount(0);
    setSquirrelSize(1);
    setAcornSpeed(5);
    setShowExitButton(false);
  };

  const resetGame = () => {
    setPosition(0);
    setXPosition(Math.random() * (window.innerWidth - 50));
    setIsGameOver(false);
    setCatchCount(0);
    setScore(0);
    setSquirrelSize(1); // Reset squirrel size
    setAcornSpeed(5); // Reset speed
    setAcornCount(0); // Reset acorn count
    setShowExitButton(false); // Hide exit button on restart
  };

  return (
    <div className="relative w-screen h-screen bg-gray-100 flex justify-center items-center">
      {!isGameStarted && <HelpMenu msg="Start" onStart={() => setIsGameStarted(true)} />}
      {isGameStarted && (
        <>
          <Ball
            position={position}
            xPosition={xPosition}
            platformX={platformX}
            acornSpeed={acornSpeed}
            onMiss={handleMiss}
            onCatch={handleCatch}
          />
          <Platform
            setPlatformX={setPlatformX}
            platformSpeed={30}
            squirrelSize={squirrelSize} // Pass squirrel size here
          />
          <div className="absolute top-5 left-5 text-xl text-red-600 font-bold">
            Score: {score}
          </div>
          {isGameOver && <GameOver score={score} onRestart={resetGame} />}
        </>
      )}
      {showExitButton && !isGameOver && (
        <button
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-green-500 text-white rounded-lg text-lg"
          onClick={handleExit}
        >
          Exit Game
        </button>
      )}
      {showExitButton && isGameOver && (
        <button
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-red-500 text-white rounded-lg text-lg"
          onClick={handleExit}
        >
          Exit Game
        </button>
      )}
    </div>
  );
};

export default Game;
