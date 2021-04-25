import { FC } from "react";
import { FACE_CARDS } from "./constants";

interface Props {
  value: number;
}

const PlayingCard: FC<Props> = ({ value }) => {
  const getCardDigit = (value: number): string => {
    return value < 11
      ? value.toString()
      : FACE_CARDS[value as keyof typeof FACE_CARDS];
  };
  return (
    <div className="card m-1">
      <div className="card-body">{getCardDigit(value)}</div>
    </div>
  );
};

export default PlayingCard;
