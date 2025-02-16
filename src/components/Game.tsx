
import React, { useState, useEffect } from "react";
import Ball from "./Ball";
import Platform from "./Platform";

const Game: React.FC = () => {
  const [position, setPosition] = useState<number>(0);
  const [xPosition, setXPosition] = useState<number>(Math.random() * (window.innerWidth - 50));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [platformX, setPlatformX] = useState<number>(window.innerWidth / 2 - 50);
  const [catchCount, setCatchCount] = useState<number>(0);
  const [platformSpeed, setPlatformSpeed] = useState<number>(30); // Start with 30px per key press
  const [score, setScore] = useState<number>(0); // Track the score
  const [squirrelSize, setSquirrelSize] = useState<number>(1); // Track squirrel size (1 means original size)

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setPosition((prevPosition) => prevPosition + 5); // Ball falls
    }, 16);

    return () => clearInterval(interval);
  }, [isGameOver]);

  console.log(catchCount)
  // When ball is caught by platform, reset it to the top and randomize X position
  const handleCatch = () => {
    setPosition(0); // Reset ball to the top
    setXPosition(Math.random() * (window.innerWidth - 50)); // Randomize X position
    setCatchCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 2) {
        setSquirrelSize((prevSize) => Math.max(0.5, prevSize - 0.1)); // Decrease squirrel size every 2 catches
        setCatchCount(0); // Reset catch count
      }
      return newCount;
    });
    setScore((prevScore) => prevScore + 1); // Increment score on successful catch
  };

  // When ball touches the bottom → Game Over
  const handleMiss = () => {
    setIsGameOver(true);
  };

  // Restart game
  const resetGame = () => {
    setPosition(0);
    setXPosition(Math.random() * (window.innerWidth - 50));
    setIsGameOver(false);
    setCatchCount(0); // Reset catch count
    setPlatformSpeed(30); // Reset platform speed
    setScore(0); // Reset score
    setSquirrelSize(1); // Reset squirrel size to original
  };

  return (
    <div className="relative w-screen h-screen bg-gray-100 flex justify-center items-center">
      <Ball position={position} xPosition={xPosition} platformX={platformX} onMiss={handleMiss} onCatch={handleCatch} />
      <Platform setPlatformX={setPlatformX} platformSpeed={platformSpeed} squirrelSize={squirrelSize} />

      <div className="absolute top-5 left-5 text-xl text-red font-bold">
        Score: {score} {/* Display score */}
      </div>

      {isGameOver && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 text-white text-center">
          <h1 className="text-3xl font-bold">Game Over</h1>
          <button className="mt-4 px-6 py-2 bg-red-500 rounded-lg text-white text-lg" onClick={resetGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
