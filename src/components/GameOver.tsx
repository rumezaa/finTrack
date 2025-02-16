import React from "react";
import Card from "./Card";

type GameOverProps = {
  onRestart: () => void;
  score: number; // Accept score as prop
};

const GameOver: React.FC<GameOverProps> = (props: GameOverProps) => {
  const { onRestart, score } = props;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-50 text-white text-center">
      <button
        className="absolute top-4 right-4 text-2xl"
        onClick={onRestart}
      >
        ❓
      </button>
      <h1 className="text-3xl font-bold mb-4">Game Over</h1>

      {/* Rotating Message Card */}
      <Card />
      
      <div className="text-xl mt-4 font-bold text-white">
        Final Score: {score} {/* Display final score */}
      </div>

      <button
        className="mt-4 px-6 py-2 bg-red-500 rounded-lg text-white text-lg"
        onClick={onRestart}
      >
        Restart
      </button>
    </div>
  );
};

export default GameOver;
