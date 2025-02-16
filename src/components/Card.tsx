import React from "react";

const messages = [
  "You can't save acorns just like you cant save cash",
  "Don't be nutty! Save the acorns!",
  "You're bad at this game! Just like your bad at saving money",
];

const Card: React.FC = () => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center w-64">
      <p className="text-lg font-bold text-black">{randomMessage}</p>
    </div>
  );
};

export default Card;
