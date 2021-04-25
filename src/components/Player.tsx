import { FC } from "react";
import { calculateScore } from "./helpers";

interface Props {
  onHit: () => void;
  onStick: () => void;
  cards: number[];
  stick: boolean;
}

const Player: FC<Props> = ({ cards, stick, onHit, onStick }) => {
  const score = calculateScore(cards);
  const isPlayerBust = score > 21;

  if (isPlayerBust) {
    return (
      <h1>
        <span className="badge bg-danger  m-1">Bust</span>
      </h1>
    );
  } else if (stick) {
    return (
      <div>
        <h1>
          <span className="badge bg-primary  m-1">Player : {score}</span>
        </h1>
      </div>
    );
  } else
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

export default Player;
