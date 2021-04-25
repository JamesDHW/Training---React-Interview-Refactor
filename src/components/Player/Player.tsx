import { FC } from "react";

interface Props {
  onHit: () => void;
  onStick: () => void;
  score: number;
  stick: boolean;
}

export const Player: FC<Props> = ({ score, stick, onHit, onStick }) => {
  const isPlayerBust = score > 21;

  if (isPlayerBust) {
    return (
      <h1>
        <span className="badge bg-danger  m-1">Bust</span>
      </h1>
    );
  }

  if (stick) {
    return (
      <div>
        <h1>
          <span className="badge bg-primary  m-1">Player : {score}</span>
        </h1>
      </div>
    );
  }

  return (
    <div>
      <button className="btn btn-danger m-3" onClick={onHit}>
        Hit
      </button>
      <button className="btn btn-primary m-3" onClick={onStick}>
        Stick
      </button>
      <h2>
        <span className="badge bg-primary  m-1">Player : {score}</span>
      </h2>
    </div>
  );
};
