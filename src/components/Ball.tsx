import React, { useEffect } from "react";

type BallProps = {
  position: number;
  xPosition: number;
  platformX: number;
  acornSpeed: number;
  onMiss: () => void;
  onCatch: () => void;
}

const Ball: React.FC<BallProps> = (props: BallProps) => {
  const { position, xPosition, platformX,  onMiss, onCatch } = props;

  const ballSize = 48;
  const platformY = window.innerHeight - 50;
  const platformWidth = 100;

  // Acorn SVG
  const acornSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={ballSize} height={ballSize}>
      <g fill="#8B4513">
        <path d="M32 2C21.6 2 14 9.6 14 18C14 24.8 24 28 24 36C24 40.8 20.4 42.4 20.4 44.8C20.4 46.4 22.4 48 24 48C25.6 48 32 44.8 32 40.8C32 36 36 36 36 28C36 9.6 28.4 2 32 2Z" />
        <path fill="#4B2C20" d="M32 2C30 4 28 5 28 5C28 6.5 30 8 32 8C34 8 36 6.5 36 5C36 5 34 4 32 2Z" />
      </g>
    </svg>
  );

  // Collision check when the ball falls
  useEffect(() => {
    if (position + ballSize >= platformY && position + ballSize <= platformY + 20) {
      if (xPosition + ballSize > platformX && xPosition < platformX + platformWidth) {
        onCatch(); // Ball caught by platform
      }
    } else if (position + ballSize >= window.innerHeight) {
      onMiss(); // Ball missed the platform (game over)
    }
  }, [position, xPosition, platformX, platformY, onCatch, onMiss]);

  return (
    <div
      className="absolute"
      style={{
        top: position,
        left: xPosition,
        width: ballSize,
        height: ballSize,
        pointerEvents: "none", // Prevent any interaction with the ball
      }}
    >
      {acornSVG}
    </div>
  );
};

export default Ball;
