import React from "react";

interface GameOverProps {
  onRestart: () => void;
  onShowHelp: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ onRestart, onShowHelp }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 text-white text-center">
      <h1 className="text-3xl font-bold">Game Over</h1>
      <button
        className="mt-4 px-6 py-2 bg-red-500 rounded-lg text-white text-lg"
        onClick={onRestart}
      >
        Restart
      </button>
      {/* Question mark icon at the top-right of the game over screen */}
      <button
        className="absolute top-5 right-5 px-4 py-2 bg-blue-500 rounded-full text-white text-2xl"
        onClick={onShowHelp}
      >
        ?
      </button>
    </div>
  );
};

export default GameOver;
